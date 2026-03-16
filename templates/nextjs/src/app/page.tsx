export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20 text-slate-900">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <span className="inline-flex w-fit rounded-full bg-slate-900 px-3 py-1 text-sm font-medium text-white">
          launchpad
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Build Vercel-ready apps from a shared starter.
        </h1>
        <p className="text-lg leading-8 text-slate-700">
          This template is designed for future Cursor Cloud Agents to copy, customize,
          and deploy with minimal setup.
        </p>
      </div>
    </main>
  );
}
