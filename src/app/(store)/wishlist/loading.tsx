export default function WishlistLoading() {
  return (
    <main className="min-h-screen w-full bg-white pb-32 pt-6 md:pt-12 animate-pulse">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        
        {/* Back Link Skeleton */}
        <div className="mb-8 hidden h-4 w-24 bg-zinc-100 rounded-md md:block"></div>

        {/* Header Skeleton */}
        <div className="mb-10 flex items-end justify-between border-b border-black/10 pb-6">
          <div>
            <div className="mb-2 h-8 w-48 bg-zinc-200 rounded-md md:h-10 md:w-64"></div>
            <div className="h-3 w-32 bg-zinc-100 rounded-md"></div>
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-6 xl:gap-x-8 xl:gap-y-16">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="aspect-[3/4] w-full rounded-sm bg-zinc-100"></div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-3 w-3/4 rounded-md bg-zinc-200"></div>
                <div className="h-3 w-1/4 rounded-md bg-zinc-100"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}