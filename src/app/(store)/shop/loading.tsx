export default function ShopLoading() {
  return (
    <main className="min-h-screen w-full bg-white pb-32 pt-6 md:pt-12">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 animate-pulse">
        
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-20">
          
          {/* SIDEBAR SKELETON */}
          <div className="mb-8 flex flex-col lg:mb-0 lg:w-1/4 lg:shrink-0">
            {/* Title Skeleton */}
            <div className="h-10 w-48 bg-zinc-200 rounded-md mb-6 lg:mb-10"></div>
            
            {/* Filter Links Skeleton */}
            <div className="flex w-full gap-6 border-y border-black/10 py-4 lg:flex-col lg:gap-6 lg:border-y-0 lg:border-t lg:py-8">
              <div className="h-4 w-24 bg-zinc-100 rounded-md"></div>
              <div className="h-4 w-20 bg-zinc-100 rounded-md"></div>
              <div className="h-4 w-28 bg-zinc-100 rounded-md"></div>
            </div>
          </div>

          {/* PRODUCT GRID SKELETON */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 xl:gap-x-8 xl:gap-y-16">
              {/* Generate 6 fake product cards */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col gap-4">
                  {/* Image Skeleton */}
                  <div className="aspect-[3/4] w-full bg-zinc-100 rounded-sm"></div>
                  {/* Text Skeleton */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-3 w-3/4 bg-zinc-200 rounded-md"></div>
                    <div className="h-3 w-1/4 bg-zinc-100 rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}