export default function Loading() {
  return (
    <section className="min-h-full bg-zinc-50 px-4 py-16 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-6xl animate-pulse flex-col gap-10">
        <div className="max-w-3xl space-y-4">
          <div className="h-8 w-36 rounded-full bg-red-100 dark:bg-red-500/20" />
          <div className="h-12 w-full max-w-2xl rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-6 w-full max-w-xl rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <div className="grid overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_24px_80px_-40px_rgba(0,0,0,0.35)] dark:border-zinc-800 dark:bg-zinc-950 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="aspect-4/3 min-h-64 bg-zinc-200 dark:bg-zinc-900 sm:aspect-16/10 sm:min-h-80 lg:aspect-auto lg:min-h-135" />

          <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="h-5 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-5 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-5 w-5/6 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="h-4 w-28 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <div className="h-8 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-8 w-28 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-8 w-22 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  </div>
                </div>

                <div>
                  <div className="h-4 w-32 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                  <div className="mt-3 h-5 w-3/4 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 border-t border-zinc-200 pt-5 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <div className="h-4 w-28 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-6 w-24 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
              </div>
              <div className="h-11 w-full rounded-full bg-red-200 dark:bg-red-500/20 sm:w-40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}