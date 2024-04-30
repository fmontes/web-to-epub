import { Form } from "@/components/Form";


export default function Home() {
  return <main className="flex min-h-screen w-full items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
    <div className="w-full max-w-md space-y-4">
      <h1 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-gray-50">Convert to EPUB</h1>
      <p className="text-gray-500 dark:text-gray-400">Enter a URL to convert the web page to an EPUB file.</p>
      <Form />
    </div>
  </main>;
}
