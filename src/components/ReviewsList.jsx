import { useState, useEffect } from 'react';
import { getReviews } from '../utils/api';
import ReviewFilter from './ReviewFilter';
import ReviewCard from './ReviewCard';
import ErrorPage from './ErrorPage';

const ReviewsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    return getReviews()
      .then((res) => {
        setReviews(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, []);

  if (error) {
    return <ErrorPage message={error.body.msg} />;
  }
  return (
    <>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <>
          <ReviewFilter setReviews={setReviews} reviews={reviews} />
          <div className='grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-3'>
            {reviews.map((review) => {
              return <ReviewCard key={review.review_id} review={review} />;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default ReviewsList;
