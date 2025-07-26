interface AboutSectionProps {
  content?: string
  title?: string
}

export default function AboutSection({ content, title = "About" }: AboutSectionProps) {
  return (
    <section className="py-12 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">{title}</h2>
        <div className="prose prose-lg prose-invert mx-auto">
          {content ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <div className="text-gray-300 text-center">
              <p className="mb-6">
                Welcome to my live streaming hub! I'm passionate about creating engaging content 
                and building a community of like-minded viewers.
              </p>
              <p className="mb-6">
                Here you'll find live streams, recorded videos, and interactive chat experiences. 
                Whether I'm gaming, coding, or just chatting, there's always something happening.
              </p>
              <p>
                Join the community and be part of the conversation. Your engagement and feedback 
                make every stream better!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}