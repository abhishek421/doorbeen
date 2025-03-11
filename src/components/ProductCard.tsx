import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { Product, Store } from '../types';

interface ProductCardProps {
  product: Product;
  store?: Store;
  showStoreInfo?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, store, showStoreInfo = false }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-700">
      <Link to={`/product/${product.id}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="text-lg font-semibold text-gray-100 hover:text-indigo-400">{product.name}</h3>
          </Link>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-400">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <p className="mt-1 text-sm text-gray-400">{product.category}</p>
        
        <div className="mt-2 flex justify-between items-center">
          <p className="text-lg font-bold text-gray-100">${product.price.toFixed(2)}</p>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${product.inStock > 0 ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
            {product.inStock > 0 ? `${product.inStock} in stock` : 'Out of stock'}
          </span>
        </div>
        
        {showStoreInfo && store && (
          <div className="mt-3 pt-3 border-t border-gray-700">
            <Link to={`/store/${store.id}`} className="flex items-center text-sm text-gray-400 hover:text-indigo-400">
              <div className="h-6 w-6 rounded-full overflow-hidden mr-2">
                <img 
                  src={store.logo || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'} 
                  alt={store.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              {store.name}
            </Link>
            {store.distance && (
              <div className="mt-1 flex items-center text-xs text-gray-500">
                <MapPin className="h-3 w-3 mr-1" />
                {store.distance.toFixed(1)} km away
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
