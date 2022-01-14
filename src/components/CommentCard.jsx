import { useContext, useState } from "react";
import { UserContext } from "../contexts/user";
import { deleteComment } from "../utils/api";
import ErrorPage from "./ErrorPage";

const CommentCard = ({ comment, setComments }) => {
  const [error, setError] = useState(null);
  const { user, isLoggedIn } = useContext(UserContext);

  const handleDeleteClick = (event) => {
    event.preventDefault();
    setComments((curr) =>
      [...curr].filter((obj) => obj.comment_id !== comment.comment_id)
    );
    deleteComment(comment.comment_id).catch((err) => {
      setError({ err });
    });
  };

  if (error) {
    return <ErrorPage message={error.body.msg} />;
  }
  return (
    <>
      <div className="text-left text-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="#cb7a00"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          />
        </svg>
        {comment.author}
      </div>
      <div className="text-left">{comment.body}</div>
      {isLoggedIn && user.username === comment.author && (
        <button onClick={handleDeleteClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="#CB0019"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default CommentCard;
