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
    <div>
      author: {comment.author}
      <br />
      Body: {comment.body}
      {isLoggedIn && user.username === comment.author && (
        <button onClick={handleDeleteClick}>delete</button>
      )}
    </div>
  );
};

export default CommentCard;
