import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, Store, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { currentUser, logout, isVendor } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <ShoppingBag className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-white">Doorbeen</span>
            </Link>
          </div>

          {/* Desktop search bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xl px-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
                  placeholder="Search for products or stores..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center">
            <Link to="/stores" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-indigo-400">
              Stores
            </Link>
            <Link to="/categories" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-indigo-400">
              Categories
            </Link>
            
            {currentUser ? (
              <div className="ml-4 flex items-center">
                {isVendor && (
                  <Link to="/vendor/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-indigo-400 hover:text-indigo-300">
                    Vendor Dashboard
                  </Link>
                )}
                <div className="ml-4 relative">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="flex text-sm rounded-full focus:outline-none"
                      id="user-menu-button"
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-indigo-900 flex items-center justify-center">
                        <User className="h-5 w-5 text-indigo-300" />
                      </div>
                    </button>
                    <span className="ml-2 text-sm font-medium text-gray-300">{currentUser.name}</span>
                    <button 
                      onClick={logout}
                      className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-red-400"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="ml-4 flex items-center">
                <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-indigo-400">
                  Login
                </Link>
                <Link to="/register" className="ml-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form onSubmit={handleSearch} className="mb-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
                  placeholder="Search for products or stores..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            
            <Link 
              to="/stores" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-indigo-400 hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Stores
            </Link>
            <Link 
              to="/categories" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-indigo-400 hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            
            {currentUser ? (
              <>
                {isVendor && (
                  <Link 
                    to="/vendor/dashboard" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-indigo-400 hover:text-indigo-300 hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Store className="inline-block h-5 w-5 mr-1" />
                    Vendor Dashboard
                  </Link>
                )}
                <div className="px-3 py-2 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-indigo-900 flex items-center justify-center">
                    <User className="h-5 w-5 text-indigo-300" />
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-300">{currentUser.name}</span>
                </div>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-gray-700"
                >
                  <LogOut className="inline-block h-5 w-5 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <div className="mt-3 space-y-1">
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-indigo-400 hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
