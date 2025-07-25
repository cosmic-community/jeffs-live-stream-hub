interface StreamStatusProps {
  isLive: boolean
  streamTitle?: string
  offlineMessage?: string
}

export default function StreamStatus({ isLive, streamTitle, offlineMessage }: StreamStatusProps) {
  if (isLive) {
    return (
      <div className="space-y-2 animate-fade-in">
        <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 border border-red-600/30 px-4 py-2 rounded-full text-sm font-semibold">
          <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
          LIVE NOW
        </div>
        {streamTitle && (
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {streamTitle}
          </h1>
        )}
        <p className="text-muted-foreground">
          Join the live stream and chat with the community!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="inline-flex items-center gap-2 bg-muted text-muted-foreground border border-border px-4 py-2 rounded-full text-sm font-medium">
        <span className="w-2 h-2 bg-muted-foreground rounded-full"></span>
        OFFLINE
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-foreground">
        {offlineMessage || "Jeff is currently offline"}
      </h1>
      <p className="text-muted-foreground">
        Check out past videos below or follow on social media for stream notifications
      </p>
    </div>
  )
}