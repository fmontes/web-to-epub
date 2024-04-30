import { EPub } from '@lesjoursfr/html-to-epub';
import ogs from 'open-graph-scraper';
import type { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';
import fs, { createReadStream } from 'fs';

import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

type ResponseData = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const url = req.query.url as string;

  if (!url) {
    return res.status(400).json({
      message: 'URL is required',
    });
  }

  const html = await fetch(url).then((res) => res.text());

  const doc = new JSDOM(html, {
    url,
  });
  const reader = new Readability(doc.window.document);
  const data = reader.parse();

  const og = await ogs({
    url,
  }).then((res) => res.result);

  const epub = new EPub(
    {
      title: og.ogTitle || '',
      description: og.ogDescription || '',
      content: [
        {
          title: og.ogTitle || '',
          data: data?.content as string,
        },
      ],
      verbose: true,
    },
    'output.epub'
  );

  await epub
    .render()
    .then((here) => {
      console.log('Ebook Generated Successfully!', here);
    })
    .catch((err) => {
      console.error('Failed to generate Ebook because of ', err);
    });

  const filePath = join(process.cwd(), '.', 'output.epub');

  // Set headers
  res.setHeader('Content-Type', 'application/epub+zip');
  res.setHeader('Content-Disposition', 'attachment; filename=output.epub');

  const fileStream = createReadStream(filePath);
  fileStream.pipe(res);

  fileStream.pipe(res).on('finish', () => {
    // Remove the output.epub file after the stream finishes
    fs.unlinkSync(filePath);
  });
}
