export default function ProductLoading() {
  return (
    <main className="min-h-screen w-full bg-white pb-32 pt-6 md:pt-8 animate-pulse">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-12 lg:gap-16">
          
          {/* Image Skeleton */}
          <div className="flex w-full md:w-[45%] md:max-w-[400px] lg:max-w-[450px] md:flex-row gap-4">
            <div className="hidden w-14 shrink-0 flex-col gap-3 md:flex lg:w-16">
              <div className="aspect-[3/4] w-full bg-zinc-100"></div>
              <div className="aspect-[3/4] w-full bg-zinc-100"></div>
              <div className="aspect-[3/4] w-full bg-zinc-100"></div>
            </div>
            <div className="aspect-[3/4] w-full bg-zinc-100 flex-1"></div>
          </div>

          {/* Details Skeleton */}
          <div className="w-full md:w-[55%] md:max-w-md pt-4 md:pt-0 space-y-6">
            <div className="h-4 w-24 bg-zinc-100"></div>
            <div className="h-10 w-3/4 bg-zinc-200"></div>
            <div className="h-6 w-32 bg-zinc-100"></div>
            <div className="h-px w-full bg-black/5 my-8"></div>
            <div className="h-12 w-full bg-zinc-100"></div>
            <div className="h-14 w-full bg-zinc-200 mt-4"></div>
          </div>

        </div>
      </div>
    </main>
  );
}