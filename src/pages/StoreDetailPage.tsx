import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, Globe, ArrowLeft } from 'lucide-react';
import { getStoreById, getProductsByStoreId } from '../utils/search';
import ProductCard from '../components/ProductCard';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import { useAuth } from '../context/AuthContext';

const StoreDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const [store, setStore] = useState(id ? getStoreById(id) : null);
  const [products, setProducts] = useState(id ? getProductsByStoreId(id) : []);
  const [loading, setLoading] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  useEffect(() => {
    if (id) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const foundStore = getStoreById(id);
        setStore(foundStore);
        if (foundStore) {
          setProducts(getProductsByStoreId(id));
        }
        setLoading(false);
      }, 300);
    }
  }, [id]);
  
  const handleReviewSubmit = (rating: number, comment: string) => {
    if (!store || !currentUser) return;
    
    // In a real app, this would be an API call
    const newReview = {
      id: `review-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      rating,
      comment,
      date: new Date().toISOString(),
    };
    
    // Update store with new review
    const updatedStore = {
      ...store,
      reviews: [newReview, ...store.reviews],
      // Recalculate average rating
      rating: store.reviews.length > 0 
        ? (store.reviews.reduce((sum, r) => sum + r.rating, rating) / (store.reviews.length + 1))
        : rating
    };
    
    setStore(updatedStore);
    setShowReviewForm(false);
  };
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }
  
  if (!store) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-lg font-medium text-gray-100">Store not found</h3>
          <p className="mt-2 text-sm text-gray-400">
            The store you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/" className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="text-gray-400 hover:text-gray-300">Home</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2 text-gray-500">/</span>
            <Link to="/stores" className="text-gray-400 hover:text-gray-300">Stores</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-200">{store.name}</span>
          </li>
        </ol>
      </nav>
      
      <div className="mb-6">
        <Link to="javascript:history.back()" className="inline-flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Link>
      </div>
      
      {/* Store Header */}
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
        <div className="h-48 bg-gray-700 relative">
          {store.logo ? (
            <img 
              src={store.logo} 
              alt={store.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="h-24 w-24 rounded-full bg-gray-800 flex items-center justify-center">
                <span className="text-4xl font-bold text-indigo-400">{store.name.charAt(0)}</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-100">{store.name}</h1>
              <div className="mt-1 flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-400">{store.rating.toFixed(1)} ({store.reviews.length} reviews)</span>
              </div>
            </div>
            
            {currentUser && !showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="mt-4 md:mt-0 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Write a Review
              </button>
            )}
          </div>
          
          <p className="mt-4 text-gray-300">{store.description}</p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-200">Address</h3>
                <p className="mt-1 text-sm text-gray-400">
                  {store.address}<br />
                  {store.city}, {store.state} {store.zipCode}
                </p>
                {store.distance && (
                  <p className="mt-1 text-xs text-gray-500">
                    {store.distance.toFixed(1)} km away
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-200">Phone</h3>
                <p className="mt-1 text-sm text-gray-400">
                  <a href={`tel:${store.phone}`} className="hover:text-indigo-400">
                    {store.phone}
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-200">Email</h3>
                <p className="mt-1 text-sm text-gray-400">
                  <a href={`mailto:${store.email}`} className="hover:text-indigo-400">
                    {store.email}
                  </a>
                </p>
              </div>
            </div>
            
            {store.website && (
              <div className="flex items-start">
                <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-200">Website</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    <a href={`https://${store.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
                      {store.website}
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Review Form */}
      {showReviewForm && (
        <div className="mt-8">
          <ReviewForm onSubmit={handleReviewSubmit} />
        </div>
      )}
      
      {/* Products Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-100 mb-6">Products ({products.length})</h2>
        
        {products.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
            <p className="text-gray-400">This store has no products listed yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      
      {/* Reviews Section */}
      <div className="mt-8">
        <ReviewList reviews={store.reviews} title="Store Reviews" />
      </div>
    </div>
  );
};

export default StoreDetailPage;
