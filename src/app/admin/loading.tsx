export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">
      {/* Skeleton Header */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200/50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="h-6 w-16 bg-zinc-200 rounded animate-pulse"></div>
        </div>
        <div className="h-4 w-16 bg-zinc-200 rounded animate-pulse"></div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 md:p-12">
        {/* Quick Actions Header Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="space-y-3">
            <div className="h-8 w-48 bg-zinc-200 rounded animate-pulse"></div>
            <div className="h-4 w-64 bg-zinc-100 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-32 bg-zinc-200 rounded animate-pulse"></div>
        </div>

        {/* Dynamic Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Inventory Column Skeleton */}
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white border border-zinc-200/60 rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
                <div className="h-4 w-32 bg-zinc-200 rounded animate-pulse"></div>
                <div className="h-6 w-16 bg-zinc-100 rounded-full animate-pulse"></div>
              </div>
              <div className="p-6 space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 animate-pulse">
                    <div className="w-12 h-12 bg-zinc-100 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/3 bg-zinc-200 rounded"></div>
                      <div className="h-3 w-1/4 bg-zinc-100 rounded"></div>
                    </div>
                    <div className="h-4 w-12 bg-zinc-200 rounded"></div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-8">
            <section className="bg-white p-6 border border-zinc-200/60 rounded-xl shadow-sm space-y-6">
              <div className="h-4 w-32 bg-zinc-200 rounded animate-pulse"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-14 w-full bg-zinc-100 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </section>
            <section className="bg-zinc-100 p-6 rounded-xl h-32 animate-pulse"></section>
          </div>

        </div>
      </main>
    </div>
  );
}