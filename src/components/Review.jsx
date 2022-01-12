import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReview } from "../utils/api";
import { Link } from "react-router-dom";

const Review = () => {
  const [review, setReview] = useState([]);
  const [vote, setVote] = useState("");

  const handleVoteClick = (event) => {
    event.preventDefault();
    setVote((curr) => (curr += 1));
  };

  const { review_id } = useParams();
  useEffect(() => {
    return getReview(review_id).then((res) => {
      setReview(res);
      setVote(res.votes);
    });
  }, []);
  return (
    <div>
      Review : {review.review_id}
      <br />
      Review Title: {review.title}
      <br />
      Owner: {review.owner}
      <br />
      Category: {review.category}
      <br />
      Votes: {vote} <button onClick={handleVoteClick}>VOTE</button>
      <br />
      <Link to={`/reviews/${review.review_id}/comments`}>
        Comments: {review.comment_count}
      </Link>
    </div>
  );
};

export default Review;
