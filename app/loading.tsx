export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="space-y-8 animate-pulse">
        {/* Status Header Skeleton */}
        <div className="text-center">
          <div className="h-8 bg-muted rounded-lg w-64 mx-auto mb-2"></div>
          <div className="h-4 bg-muted rounded w-48 mx-auto"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Video Player Skeleton */}
          <div className="xl:col-span-3 space-y-6">
            <div className="stream-player bg-muted"></div>
            
            {/* Mobile About Section Skeleton */}
            <div className="xl:hidden space-y-4">
              <div className="h-6 bg-muted rounded w-32"></div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="xl:col-span-1 space-y-8">
            {/* Chat Skeleton */}
            <div>
              <div className="h-6 bg-muted rounded w-24 mb-4"></div>
              <div className="chat-container">
                <div className="flex-1 p-4 space-y-3">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-muted rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-muted rounded w-20 mb-1"></div>
                        <div className="h-3 bg-muted rounded w-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border p-4">
                  <div className="h-12 bg-muted rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* Desktop About Section Skeleton */}
            <div className="hidden xl:block space-y-4">
              <div className="h-6 bg-muted rounded w-16"></div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Videos Skeleton */}
        <section className="space-y-6">
          <div className="text-center">
            <div className="h-8 bg-muted rounded w-48 mx-auto mb-2"></div>
            <div className="h-4 bg-muted rounded w-64 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="feature-card space-y-4">
                <div className="aspect-video bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}