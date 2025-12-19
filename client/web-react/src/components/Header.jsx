export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              CS
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                <span className="text-blue-600">Clini</span>
                <span className="text-teal-600">Scribe</span>
              </h2>
              <p className="text-xs text-gray-500">AI Study Assistant</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              How It Works
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Pricing
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Sign In
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}