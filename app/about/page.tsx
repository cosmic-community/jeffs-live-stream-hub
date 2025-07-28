import AboutSection from '@/components/AboutSection'

export const metadata = {
  title: 'About',
  description: 'Learn more about Jeff and his live streaming hub - gaming, coding, and community building',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AboutSection />
      </div>
    </div>
  )
}