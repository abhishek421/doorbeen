import React from 'react';
import { Product, Store } from '../types';
import ProductCard from './ProductCard';
import StoreCard from './StoreCard';

interface SearchResultsProps {
  products: Product[];
  stores: Store[];
  query: string;
  loading?: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ products, stores, query, loading = false }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (products.length === 0 && stores.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
        <h3 className="text-lg font-medium text-gray-100">No results found for "{query}"</h3>
        <p className="mt-2 text-sm text-gray-400">
          Try checking your spelling or using more general terms.
        </p>
      </div>
    );
  }

  return (
    <div>
      {stores.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Stores ({stores.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map(store => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </div>
      )}
      
      {products.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Products ({products.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => {
              const store = stores.find(s => s.id === product.storeId);
              return (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  store={store}
                  showStoreInfo={true}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
