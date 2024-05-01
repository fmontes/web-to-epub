import { EPub } from '@lesjoursfr/html-to-epub';
import ogs from 'open-graph-scraper';
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import os from 'os';
import path from 'path';

import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

type ResponseData = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const url = req.query?.url as string;

  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  const html = await fetch(url).then((response) => response.text());
  const doc = new JSDOM(html, { url });
  const reader = new Readability(doc.window.document);
  const data = reader.parse();
  const og = await ogs({ url }).then((result) => result.result);

  const tempDir = os.tmpdir();
  const outputPath = path.join(tempDir, 'output.epub');

  const epub = new EPub({
    title: og.ogTitle || 'No title provided',
    description: og.ogDescription || 'No description provided',
    content: [{
      title: og.ogTitle || 'Content Title',
      data: data?.content || '<p>No content available.</p>',
    }],
    verbose: true,
  }, outputPath);

  try {
    await epub.render();
    console.log('Ebook generated successfully at:', outputPath);

    res.setHeader('Content-Type', 'application/epub+zip');
    res.setHeader('Content-Disposition', `attachment; filename="${path.basename(outputPath)}"`);
    const fileStream = fs.createReadStream(outputPath);
    fileStream.pipe(res).on('finish', () => {
      fs.unlink(outputPath, (err) => {
        if (err) console.error('Error deleting temporary ePub file:', err);
      });
    });
  } catch (error) {
    console.error('Failed to generate ePub:', error);
    res.status(500).json({ message: 'Failed to generate ePub' });
  }
}
