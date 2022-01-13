import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReview, patchVote } from "../utils/api";
import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const Review = () => {
  const [review, setReview] = useState([]);
  const [vote, setVote] = useState("");
  const [voteButton, setVoteButton] = useState(true);
  const [error, setError] = useState(null);

  const { review_id } = useParams();

  const handleUpVoteClick = (event) => {
    event.preventDefault();
    setVoteButton((curr) => !curr);
    setVote((curr) => (curr += 1));
    return patchVote(review_id, 1).then((res) => {
      setReview(res);
    });
  };
  const handleDownVoteClick = (event) => {
    event.preventDefault();
    setVoteButton((curr) => !curr);
    setVote((curr) => (curr -= 1));
    return patchVote(review_id, -1).then((res) => {
      setReview(res);
    });
  };
  useEffect(() => {
    return getReview(review_id)
      .then((res) => {
        setReview(res);
        setVote(res.votes);
      })
      .catch((err) => {
        setError({ err });
      });
  }, [review_id]);

  if (error) {
    return <ErrorPage message={error.err.response.data.msg} />;
  }
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
      Votes: {vote}{" "}
      {voteButton ? (
        <button onClick={handleUpVoteClick}>VOTE</button>
      ) : (
        <button onClick={handleDownVoteClick}>DOWNVOTE</button>
      )}
      <br />
      <Link to={`/reviews/${review.review_id}/comments`}>
        Comments: {review.comment_count}
      </Link>
    </div>
  );
};

export default Review;
