import { useState, useEffect, useContext } from "react";
import { postReview } from "../utils/api";
import ErrorPage from "./ErrorPage";
import { UserContext } from "../contexts/user";
import { CategoryContext } from "../contexts/category";
import { getCategories } from "../utils/api";
import { useNavigate } from "react-router-dom";

const ReviewForm = () => {
  const { user, isLoggedIn } = useContext(UserContext);
  const [review_body, setReview_Body] = useState("");
  const [category, setCategory] = useState("");
  const [designer, setDesigner] = useState("");
  const [title, setTitle] = useState("");
  const [review, setReview] = useState([]);
  const [error, setError] = useState(null);
  const { categories, setCategories } = useContext(CategoryContext);
  const [emptyForm, setEmptyForm] = useState(false);
  const [sentForm, setSentForm] = useState(false);
  const navigate = useNavigate();

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      navigate("/login");
    } else if (
      title !== "" &&
      designer !== "" &&
      category !== "" &&
      review_body !== ""
    ) {
      return postReview({
        owner: user.username,
        review_body,
        category,
        designer,
        title,
      })
        .then((res) => {
          console.log("res: ", res);
          setReview(res);
          setReview_Body("");
          setCategory("");
          setDesigner("");
          setTitle("");
          setSentForm(true);
        })
        .catch((err) => {
          setError({ err });
        });
    } else {
      setEmptyForm(true);
    }
  };

  useEffect(() => {
    return getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  if (error) {
    return <ErrorPage message={error.body.msg} />;
  }
  return (
    <>
      <form onSubmit={handleReviewSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          disabled={!isLoggedIn}
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <br />
        <br />
        <label htmlFor="review_body">Body:</label>
        <input
          disabled={!isLoggedIn}
          type="text"
          value={review_body}
          onChange={(event) => {
            setReview_Body(event.target.value);
          }}
        />
        <br />
        <br />
        <label htmlFor="designer">Designer:</label>
        <input
          disabled={!isLoggedIn}
          type="text"
          value={designer}
          onChange={(event) => {
            setDesigner(event.target.value);
          }}
        />
        <br />
        <br />
        <select
          disabled={!isLoggedIn}
          defaultValue="Choose category"
          onChange={(event) => {
            setCategory(event.target.value);
          }}
          name="category"
          id="category"
        >
          <option value="Choose category" disabled>
            Choose Category
          </option>
          {categories.map((category) => {
            return (
              <option key={category.slug} value={category.slug}>
                {category.slug}
              </option>
            );
          })}
        </select>

        <br />
        {isLoggedIn ? (
          <button>Submit Reviews</button>
        ) : (
          <button>login to submit comment</button>
        )}
        {emptyForm ? <p>all areas need to be filled in</p> : null}
        {sentForm && <p>SUBMITTED {review.title}</p>}
      </form>
    </>
  );
};

export default ReviewForm;
