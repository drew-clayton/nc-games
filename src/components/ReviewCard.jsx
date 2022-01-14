import { Link } from "react-router-dom";
const ReviewCard = ({ review }) => {
  return (
    <div>
      <Link to={`/reviews/${review.review_id}`}>{review.title}</Link>
      <Link to={`/reviews/${review.review_id}`}>
        <div className="w-10/12">
          <img
            className="aspect-[4/3] rounded-[15px]"
            src={review.review_img_url}
            alt=""
          />
        </div>
      </Link>
      <Link to={`/users`}>By {review.owner}</Link>
      <div className="flex">
        <p>{review.votes}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
          />
        </svg>
      </div>
      Comments: {review.comment_count}
      <br />
      <br />
    </div>
  );
};

export default ReviewCard;
