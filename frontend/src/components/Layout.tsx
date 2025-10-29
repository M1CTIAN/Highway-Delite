import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

export default function Layout({ children, searchQuery = '', onSearchChange }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between gap-8 py-4">
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <div className="bg-gray-900 rounded-full p-2 flex items-center justify-center w-9 h-9">
                <Calendar className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold text-gray-900">highway</span>
                <span className="text-sm font-bold text-gray-900">delite</span>
              </div>
            </Link>
            
            {/* Search Bar - only show if search props are provided */}
            {onSearchChange && (
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search experiences"
                    className="w-full px-4 py-2 pr-24 rounded-md border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none text-sm bg-gray-50"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
                  <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-sm px-5 py-1.5 rounded-md transition-colors">
                    Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 mt-auto border-t border-gray-800">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2.5 mb-4">
                <div className="bg-gray-800 rounded-full p-2 flex items-center justify-center w-10 h-10">
                  <Calendar className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-base font-bold text-white">highway</span>
                  <span className="text-base font-bold text-white">delite</span>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Discover and book amazing travel experiences across India.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Experiences
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <p className="text-sm text-gray-400">
                Email: info@bookit.com<br />
                Phone: +91 1234567890
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Highway Delite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
