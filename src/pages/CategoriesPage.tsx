import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../data/mockData';
import ProductCard from '../components/ProductCard';

const CategoriesPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Extract unique categories from products
  const categories = [...new Set(mockProducts.map(product => product.category))].sort();
  
  // Get products for the selected category
  const categoryProducts = selectedCategory 
    ? mockProducts.filter(product => product.category === selectedCategory)
    : [];
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
      // Select the first category by default
      if (categories.length > 0 && !selectedCategory) {
        setSelectedCategory(categories[0]);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Browse by Category</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Categories sidebar */}
        <div className="w-full md:w-64 bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-700 h-fit">
          <h2 className="text-lg font-medium text-gray-100 mb-4">Categories</h2>
          <nav className="space-y-1">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-indigo-900 text-indigo-200'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {category}
                <span className="ml-2 text-xs rounded-full bg-gray-700 px-2 py-0.5">
                  {mockProducts.filter(p => p.category === category).length}
                </span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Products grid */}
        <div className="flex-1">
          {selectedCategory && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-100">{selectedCategory}</h2>
                <span className="text-sm text-gray-400">{categoryProducts.length} products</span>
              </div>
              
              {categoryProducts.length === 0 ? (
                <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
                  <p className="text-gray-400">No products found in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
