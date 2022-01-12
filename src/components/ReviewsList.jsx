import { useState, useEffect } from "react";
import { getReviews } from "../utils/api";
import ReviewFilter from "./ReviewFilter";
import ReviewPagination from "./ReviewPagination";
import ReviewCard from "./ReviewCard";

const ReviewsList = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    return getReviews().then((res) => {
      setReviews(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <h1>Reviews</h1>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <>
          <ReviewFilter setReviews={setReviews} reviews={reviews} />
          <ReviewPagination />
          <div>
            {reviews.map((review) => {
              return <ReviewCard key={review.review_id} review={review} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewsList;
