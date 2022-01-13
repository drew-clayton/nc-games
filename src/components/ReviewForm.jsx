const ReviewForm = () => {
  return (
    <>
      <form>
        <label htmlFor="title">Title:</label>
        <input type="text" />
        <br />
        <br />
        <label htmlFor="review_body">Body:</label>
        <input type="text" />
        <br />
        <br />
        <label htmlFor="designer">Designer:</label>
        <input type="text" />
        <br />
        <br />
        <label htmlFor="category">Category:</label>
        <input type="text" />
        <br />
        <br />
        <button>submit</button>
      </form>
    </>
  );
};

export default ReviewForm;
