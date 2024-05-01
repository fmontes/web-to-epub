import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export function SubmitButton({ url }: { url: string }) {
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsDownloading(false);
    }, 300); // Imitate a download delay

    return () => clearTimeout(timeout);
    // We only need to run this effect when isDownloading changes
  }, [isDownloading]);

  return (
    <Button asChild className={cn(!url && "opacity-50 cursor-not-allowed")}>
      <a
        href={`/api/ebook?url=${url}`}
        download
        className={cn(!url && "cursor-not-allowed pointer-events-none")}
        onClick={() => setIsDownloading(() => !isDownloading)}
      >
        {isDownloading ? (
          <>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Downloading
          </>
        ) : (
          "Download Epub"
        )}
      </a>
    </Button>
  );
}
