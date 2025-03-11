import React from 'react';
import { Star, User } from 'lucide-react';
import { Review } from '../types';

interface ReviewListProps {
  reviews: Review[];
  title?: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, title = "Customer Reviews" }) => {
  if (reviews.length === 0) {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">No reviews yet. Be the first to leave a review!</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">{title} ({reviews.length})</h3>
      
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-700">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-900 flex items-center justify-center">
                  <User className="h-5 w-5 text-indigo-300" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-100">{review.userName}</p>
                  <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-400">{review.rating.toFixed(1)}</span>
              </div>
            </div>
            
            <p className="mt-3 text-sm text-gray-300">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
