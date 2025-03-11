import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, ShoppingBag, ArrowLeft, Check } from 'lucide-react';
import { getProductById, getStoreById } from '../utils/search';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import { useAuth } from '../context/AuthContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const [product, setProduct] = useState(id ? getProductById(id) : null);
  const [store, setStore] = useState(product ? getStoreById(product.storeId) : null);
  const [loading, setLoading] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  useEffect(() => {
    if (id) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const foundProduct = getProductById(id);
        setProduct(foundProduct);
        if (foundProduct) {
          setStore(getStoreById(foundProduct.storeId));
        }
        setLoading(false);
      }, 300);
    }
  }, [id]);
  
  const handleReviewSubmit = (rating: number, comment: string) => {
    if (!product || !currentUser) return;
    
    // In a real app, this would be an API call
    const newReview = {
      id: `review-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      rating,
      comment,
      date: new Date().toISOString(),
    };
    
    // Update product with new review
    const updatedProduct = {
      ...product,
      reviews: [newReview, ...product.reviews],
      // Recalculate average rating
      rating: product.reviews.length > 0 
        ? (product.reviews.reduce((sum, r) => sum + r.rating, rating) / (product.reviews.length + 1))
        : rating
    };
    
    setProduct(updatedProduct);
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
  
  if (!product || !store) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-lg font-medium text-gray-100">Product not found</h3>
          <p className="mt-2 text-sm text-gray-400">
            The product you're looking for doesn't exist or has been removed.
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
            <Link to={`/search?q=${product.category}`} className="text-gray-400 hover:text-gray-300">{product.category}</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-200">{product.name}</span>
          </li>
        </ol>
      </nav>
      
      <div className="mb-6">
        <Link to="javascript:history.back()" className="inline-flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Link>
      </div>
      
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="h-64 md:h-full bg-gray-700">
              <img 
                src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'} 
                alt={product.name} 
                className="w-full h-full object-contain p-4"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2 p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-100">{product.name}</h1>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-400">{product.rating.toFixed(1)}</span>
              </div>
            </div>
            
            <p className="mt-2 text-sm text-gray-400">{product.category}</p>
            
            <p className="mt-4 text-3xl font-bold text-gray-100">${product.price.toFixed(2)}</p>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-200">Description</h3>
              <p className="mt-2 text-gray-300">{product.description}</p>
            </div>
            
            <div className="mt-6">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                product.inStock > 0 ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
              }`}>
                {product.inStock > 0 ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    {product.inStock} in stock
                  </>
                ) : (
                  'Out of stock'
                )}
              </div>
            </div>
            
            {/* Store Information */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h3 className="text-sm font-medium text-gray-200">Available at</h3>
              <div className="mt-2 bg-gray-700 rounded-lg p-4">
                <Link to={`/store/${store.id}`} className="flex items-center">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-600">
                    <img 
                      src={store.logo || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'} 
                      alt={store.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-100">{store.name}</h4>
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="ml-1 text-xs text-gray-400">{store.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </Link>
                
                <div className="mt-3 flex items-center text-sm text-gray-400">
                  <MapPin className="h-4 w-4 mr-1" />
                  {store.address}, {store.city}, {store.state} {store.zipCode}
                </div>
                
                {store.distance && (
                  <div className="mt-1 text-xs text-gray-500">
                    {store.distance.toFixed(1)} km away
                  </div>
                )}
                
                <Link 
                  to={`/store/${store.id}`} 
                  className="mt-3 inline-flex items-center px-3 py-1 border border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600"
                >
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  View Store
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-100">Customer Reviews</h2>
          {currentUser && !showReviewForm && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Write a Review
            </button>
          )}
        </div>
        
        {showReviewForm && (
          <div className="mb-6">
            <ReviewForm onSubmit={handleReviewSubmit} />
          </div>
        )}
        
        <ReviewList reviews={product.reviews} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
