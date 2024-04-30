"use client";

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from '@radix-ui/react-icons';

export function Form() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <form onSubmit={async (e) => {
      setLoading(true);
      e.preventDefault();
      const response = await fetch(`/api/ebook?url=${url}`);
      const blob = await response.blob();
      const urlFile = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = urlFile;
      link.download = 'ebook.epub';
      link.click();
      setLoading(false);
      setUrl('');
    }} className="flex w-full space-x-2">
      <Input onChange={(e) => setUrl(e.target.value)} value={url} className="flex-1" placeholder="Enter URL" required type="url" name="url" />
      <Button disabled={loading} type="submit">
        {loading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : null}
        Convert
      </Button>
    </form>
  );
}

