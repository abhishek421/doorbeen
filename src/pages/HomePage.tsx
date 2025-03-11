import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Store, ShoppingBag, MapPin, TrendingUp } from 'lucide-react';
import { mockStores, mockProducts } from '../data/mockData';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Get top rated stores
  const topStores = [...mockStores]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // Get trending products (highest rated)
  const trendingProducts = [...mockProducts]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Find Products in Local Stores
            </h1>
            <p className="mt-4 text-xl text-indigo-200 max-w-3xl mx-auto">
              Doorbeen helps you locate items in nearby stores and ensures they're in stock before you visit.
            </p>
            
            <div className="mt-10 max-w-xl mx-auto">
              <form onSubmit={handleSearch} className="sm:flex">
                <div className="min-w-0 flex-1">
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-3 text-base rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 sm:text-sm text-white"
                      placeholder="Search for products or stores..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    type="submit"
                    className="block w-full py-3 px-4 rounded-md shadow bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-indigo-900 sm:text-sm"
                  >
                    Search
                  </button>
                </div>
              </form>
              <div className="mt-3 text-sm text-indigo-300 flex justify-center space-x-4">
                <span>Popular: </span>
                <Link to="/search?q=electronics" className="hover:text-white">Electronics</Link>
                <Link to="/search?q=furniture" className="hover:text-white">Furniture</Link>
                <Link to="/search?q=fashion" className="hover:text-white">Fashion</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-400 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-100 sm:text-4xl">
              A better way to shop locally
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
              Doorbeen connects you with local stores and ensures product availability before you visit.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                  <Search className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-100">Smart Search</h3>
                  <p className="mt-2 text-base text-gray-400">
                    Our NLP-based search understands what you're looking for and finds the most relevant products.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-100">Local Availability</h3>
                  <p className="mt-2 text-base text-gray-400">
                    See real-time inventory at stores near you, so you know before you go.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                  <Store className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-100">Vendor Management</h3>
                  <p className="mt-2 text-base text-gray-400">
                    Store owners can easily manage their inventory and connect with customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Stores Section */}
      <div className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-100">Top-Rated Stores</h2>
            <Link to="/stores" className="text-indigo-400 hover:text-indigo-300 font-medium">
              View All Stores
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topStores.map(store => (
              <Link 
                key={store.id} 
                to={`/store/${store.id}`}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-700"
              >
                <div className="h-32 bg-gray-700 relative">
                  {store.logo ? (
                    <img 
                      src={store.logo} 
                      alt={store.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-12 w-12 text-indigo-300" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-100">{store.name}</h3>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-sm text-gray-400">{store.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-400 line-clamp-1">{store.description}</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    {store.city}, {store.state}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Products Section */}
      <div className="py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-indigo-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-100">Trending Products</h2>
            </div>
            <Link to="/search" className="text-indigo-400 hover:text-indigo-300 font-medium">
              View All Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map(product => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-700"
              >
                <div className="h-40 overflow-hidden">
                  <img 
                    src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-100">{product.name}</h3>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-sm text-gray-400">{product.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">{product.category}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-lg font-bold text-gray-100">${product.price.toFixed(2)}</p>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${product.inStock > 0 ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                      {product.inStock > 0 ? `In stock` : 'Out of stock'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Are you a store owner?</span>
            <span className="block text-indigo-200">List your products on Doorbeen today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/vendor/learn-more"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
