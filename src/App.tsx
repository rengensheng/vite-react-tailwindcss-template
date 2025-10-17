import { BrowserRouter, Link, useLocation } from 'react-router-dom';
import { Router } from './router';

function Navigation() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="ml-6 flex space-x-8">
      <Link 
        to="/" 
        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
          isActive('/') 
            ? 'border-indigo-500 text-gray-900' 
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
        }`}
      >
        Home
      </Link>
      <Link 
        to="/about" 
        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
          isActive('/about') 
            ? 'border-indigo-500 text-gray-900' 
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
        }`}
      >
        About
      </Link>
      <Link 
        to="/components" 
        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
          isActive('/components') 
            ? 'border-indigo-500 text-gray-900' 
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
        }`}
      >
        Components
      </Link>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold">My App</span>
                </div>
                <Navigation />
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Router />
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;