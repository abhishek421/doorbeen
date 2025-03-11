import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { searchProducts } from '../utils/search';
import SearchResults from '../components/SearchResults';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({ products: [], stores: [] });
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const searchResults = searchProducts(query);
      setResults(searchResults);
      setLoading(false);
      
      // Extract unique categories for filters
      const categories = [...new Set(searchResults.products.map(p => p.category))];
      if (selectedCategories.length === 0 && categories.length > 0) {
        setSelectedCategories(categories);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  // Apply filters to results
  const filteredProducts = results.products.filter(product => {
    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }
    
    // In-stock filter
    if (inStockOnly && product.inStock <= 0) {
      return false;
    }
    
    return true;
  });
  
  // Get unique categories from search results
  const categories = [...new Set(results.products.map(p => p.category))];
  
  // Toggle a category selection
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">
            {query ? `Search results for "${query}"` : 'All Products'}
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            {filteredProducts.length} products found
          </p>
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-900 text-indigo-300">
            {(selectedCategories.length < categories.length ? 1 : 0) + 
             (inStockOnly ? 1 : 0) + 
             (priceRange[0] > 0 || priceRange[1] < 2000 ? 1 : 0)}
          </span>
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        {showFilters && (
          <div className="w-full lg:w-64 bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-100">Filters</h2>
              <button
                onClick={() => {
                  setPriceRange([0, 2000]);
                  setSelectedCategories(categories);
                  setInStockOnly(false);
                }}
                className="text-sm text-indigo-400 hover:text-indigo-300"
              >
                Reset all
              </button>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-200 mb-2">Price Range</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">${priceRange[0]}</span>
                <span className="text-sm text-gray-400">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full mt-2"
              />
              <input
                type="range"
                min="0"
                max="2000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full mt-2"
              />
            </div>
            
            {/* Categories Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-200 mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      id={`category-${category}`}
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded"
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-300">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* In Stock Filter */}
            <div>
              <div className="flex items-center">
                <input
                  id="in-stock"
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={() => setInStockOnly(!inStockOnly)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded"
                />
                <label htmlFor="in-stock" className="ml-2 text-sm text-gray-300">
                  In Stock Only
                </label>
              </div>
            </div>
          </div>
        )}
        
        {/* Search Results */}
        <div className="flex-1">
          <SearchResults 
            products={filteredProducts} 
            stores={results.stores} 
            query={query} 
            loading={loading} 
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
