import { SiteSettings } from '@/types'

interface FooterProps {
  siteSettings: SiteSettings | null
}

export default function Footer({ siteSettings }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const contactEmail = siteSettings?.metadata?.contact_email

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">J</span>
              </div>
              <span className="text-xl font-bold text-white">
                Jeff's Live Stream Hub
              </span>
            </div>
            <p className="text-gray-400 max-w-md">
              Your ultimate destination for live streaming, video content, and entertainment. 
              Join the community and never miss a moment of the action.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/videos" className="text-gray-400 hover:text-white transition-colors">
                  Videos
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              {contactEmail && (
                <li>
                  <a 
                    href={`mailto:${contactEmail}`} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {contactEmail}
                  </a>
                </li>
              )}
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Jeff's Live Stream Hub. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Privacy Policy</span>
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Terms of Service</span>
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}