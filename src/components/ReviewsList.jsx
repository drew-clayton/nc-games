import { useState, useEffect } from "react";
import { getReviews } from "../utils/api";
import ReviewFilter from "./ReviewFilter";
import ReviewPagination from "./ReviewPagination";
import ReviewCard from "./ReviewCard";
import ErrorPage from "./ErrorPage";

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
      <h1>Reviews</h1>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <>
          <ReviewFilter setReviews={setReviews} reviews={reviews} />
          <ReviewPagination />
          <>
            {reviews.map((review) => {
              return <ReviewCard key={review.review_id} review={review} />;
            })}
          </>
        </>
      )}
    </>
  );
};

export default ReviewsList;
