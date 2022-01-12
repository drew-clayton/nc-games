import { Link } from "react-router-dom";
const ReviewCard = ({ review }) => {
  return (
    <div>
      <Link to={`/reviews/${review.review_id}`}>
        Review Title: {review.title}
        <br />
        Owner: {review.owner}
        <br />
        Category: {review.category}
        <br />
        votes: {review.votes}
        <br />
        comment count: {review.comment_count}
        <br />
        created At: {review.created_at}
        <br />
        <br />
      </Link>
    </div>
  );
};

export default ReviewCard;
