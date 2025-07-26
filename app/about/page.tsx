import AboutSection from '@/components/AboutSection'

export const metadata = {
  title: 'About',
  description: 'Learn more about the stream and community.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <AboutSection 
        title="About Jeff's Live Stream Hub"
        content="<p>Welcome to my personal streaming platform! This is where I share my passion for gaming, technology, and building amazing communities.</p><p>Join me for regular live streams featuring the latest games, coding sessions, and interactive Q&A with the community. Every stream is an opportunity to learn something new and connect with fellow enthusiasts.</p><p>Whether you're here for the gameplay, the tech talks, or just to hang out and chat, you're always welcome in our community!</p>"
      />
    </div>
  )
}