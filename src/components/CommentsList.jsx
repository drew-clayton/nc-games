import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getComments, postComment } from "../utils/api";
import CommentCard from "./CommentCard";
import { UserContext } from "../contexts/user";
import ErrorPage from "./ErrorPage";

/* -------------------------------------------------------------------------- */
//? Review Page  */
/* -------------------------------------------------------------------------- */

const Review = () => {
  const { user, isLoggedIn } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const [emptyBody, setEmptyBody] = useState(false);
  const { review_id } = useParams();
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  /* -------------------------------------------------------------------------- */
  //* Event Listeners */
  /* -------------------------------------------------------------------------- */

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      navigate("/login");
    } else if (body !== "") {
      return postComment(review_id, user, { body })
        .then((res) => {
          setComments((curr) => [...curr, res]);
          setBody("");
        })
        .catch((err) => {
          setError({ err });
        });
    } else {
      setEmptyBody(true);
    }
  };

  /* -------------------------------------------------------------------------- */
  //* Page render- Comments*/
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    return getComments(review_id).then((res) => setComments(res));
  }, [review_id]);

  /* -------------------------------------------------------------------------- */
  //* Component*/
  /* -------------------------------------------------------------------------- */
  if (error) {
    return <ErrorPage message={error.body.msg} />;
  }
  return (
    <>
      <h1>Comments</h1>
      <div>
        {comments.map((comment) => {
          return (
            <CommentCard
              setComments={setComments}
              key={comment.comment_id}
              comment={comment}
            />
          );
        })}
      </div>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
        ></input>
        <br />
        <button>Submit Comment</button>
        {emptyBody ? <p>"need input</p> : null}
      </form>
    </>
  );
};

export default Review;
