import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReview, patchVote } from "../utils/api";
import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import CommentsList from "./CommentsList";

const Review = () => {
  const [review, setReview] = useState([]);
  const [vote, setVote] = useState("");
  const [voteButton, setVoteButton] = useState(true);
  const [error, setError] = useState(null);

  const { review_id } = useParams();
  const handleVoteClick = (num) => {
    setVoteButton((curr) => !curr);
    setVote((curr) => (curr += num));
    return patchVote(review_id, 1).then((res) => {
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
    <div className="px-2 py-4 flex flex-wrap">
      <img
        className="h-96 w-20 object-cover lg:H-80 rounded-[20px] basis-full lg:basis-1/3 ml-6 mr-6 lg:m-0 p-3"
        src={review.review_img_url}
        alt=""
      />
      <div className="basis-full lg:basis-2/3 p-8">
        <h2 className="text-[30px] lg:text-[40px] lg:max-w-[100%]">{review.title}</h2>
        <Link
          className="capitalize underline decoration-sky-500 decoration-2  text-base"
          to="/users"
        >
          {review.owner}
        </Link>
        
        <p className="indent-8 py-4">{review.review_body}</p>
        <div className="basis-full relative">
        <p>Category: {review.category}</p>
        <p>Designer: {review.designer}</p>
        <p>
          Votes: {vote}
          {voteButton ? (
            <button className="px-2" onClick={() => handleVoteClick(1)}>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="#3346FF"
              >
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
            </button>
          ) : (
            <button className="px-2" onClick={() => handleVoteClick(-1)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="#3346FF"
              >
                <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
              </svg>
            </button>
          )}
        </p>
      </div>
      </div>
      <div className="basis-full text-center">
        <CommentsList />
      </div>
    </div>
  );
};

export default Review;
