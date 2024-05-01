"use client";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/SubmitButton";
import { useState } from "react";

export function UrlSubmissionControl() {
  const [url, setUrl] = useState("");
  return (
    <div className="flex w-full space-x-2">
      <Input
        name="url"
        className="flex-1"
        placeholder="Enter URL"
        required
        type="url"
        onChange={(e) => setUrl(e.target.value)}
      />
      <SubmitButton url={url} />
    </div>
  );
}
