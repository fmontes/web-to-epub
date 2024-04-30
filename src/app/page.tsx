import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Home() {
  async function create(formData: FormData) {
    'use server'

    console.log(formData.get('url'))
  }

  return <main className="flex min-h-screen w-full items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
    <div className="w-full max-w-md space-y-4">
      <h1 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-gray-50">Convert to EPUB</h1>
      <p className="text-gray-500 dark:text-gray-400">Enter a URL to convert the web page to an EPUB file.</p>
      <form action={create} className="flex w-full space-x-2">
        <Input className="flex-1" placeholder="Enter URL" required type="url" name="url" />
        <Button type="submit">Convert</Button>
      </form>
    </div>
  </main>;
}
