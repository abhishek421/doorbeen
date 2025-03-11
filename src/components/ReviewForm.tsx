import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmit(rating, comment);
      setRating(0);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-700">
      <h3 className="text-lg font-semibold text-gray-100 mb-3">Write a Review</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-1 focus:outline-none"
            >
              <Star 
                className={`h-6 w-6 ${
                  (hoveredRating ? hoveredRating >= star : rating >= star)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-600'
                }`} 
              />
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2">
          Your Review
        </label>
        <textarea
          id="comment"
          rows={4}
          className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-100"
          placeholder="Share your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      
      <button
        type="submit"
        disabled={rating === 0}
        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
          rating > 0
            ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            : 'bg-gray-600 cursor-not-allowed'
        }`}
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
