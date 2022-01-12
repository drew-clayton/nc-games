const CommentCard = ({ comment }) => {
  return (
    <div>
      author: {comment.author}
      <br />
      Body: {comment.body}
      <button>delete</button>
    </div>
  );
};

export default CommentCard;
