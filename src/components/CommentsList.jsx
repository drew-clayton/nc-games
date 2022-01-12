import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../utils/api";
import CommentCard from "./CommentCard";
import RequireLogin from "./RequireLogin";

const Review = () => {
  const [comments, setComments] = useState([]);
  const { review_id } = useParams();
  useEffect(() => {
    return getComments(review_id).then((res) => setComments(res));
  }, [review_id]);
  return (
    <RequireLogin>
      <>
        <h1>Comments</h1>
        <div>
          {comments.map((comment) => {
            return <CommentCard key={comment.comment_id} comment={comment} />;
          })}
        </div>
      </>
    </RequireLogin>
  );
};

export default Review;
