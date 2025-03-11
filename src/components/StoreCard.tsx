import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ShoppingBag } from 'lucide-react';
import { Store } from '../types';

interface StoreCardProps {
  store: Store;
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-700">
      <Link to={`/store/${store.id}`}>
        <div className="h-40 bg-gray-700 relative">
          {store.logo ? (
            <img 
              src={store.logo} 
              alt={store.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingBag className="h-16 w-16 text-indigo-300" />
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link to={`/store/${store.id}`} className="block">
            <h3 className="text-lg font-semibold text-gray-100 hover:text-indigo-400">{store.name}</h3>
          </Link>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-400">{store.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <p className="mt-1 text-sm text-gray-400 line-clamp-2">{store.description}</p>
        
        <div className="mt-3 flex items-center text-sm text-gray-400">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{store.city}, {store.state}</span>
          {store.distance && (
            <span className="ml-2 text-xs">({store.distance.toFixed(1)} km away)</span>
          )}
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <span className="text-sm text-gray-400">{store.products.length} products</span>
          <Link 
            to={`/store/${store.id}`} 
            className="px-3 py-1 text-xs font-medium text-indigo-400 bg-indigo-900 rounded-full hover:bg-indigo-800"
          >
            View Store
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
