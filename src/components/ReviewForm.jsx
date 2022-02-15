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
          setReview_Body("");
          setCategory("");
          setDesigner("");
          setTitle("");
          setSentForm(true);
          setEmptyForm(false)
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
  }, [setCategories]);

  if (error) {
    return <ErrorPage message={error.body.msg} />;
  }
  return (
    <div className="mt-0">
      <form onSubmit={handleReviewSubmit}>
        <div className="px-4 py-5 bg-white-100">
          <div className="grid grid-cols-1 gap-6">
            <div className="md:col-span-6 col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                disabled={!isLoggedIn}
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                type="text"
                name="title"
                id="title"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full md:w-6/12  shadow-sm sm:text-sm border-gray-300 rounded-md border"
              />
            </div>

            <div className="md:col-span-6 col-span-4">
              <label
                htmlFor="review_body"
                className="block text-sm font-medium text-gray-700"
              >
                Review
              </label>
              <div className="mt-1 block w-full md:w-6/12">
                <textarea
                  disabled={!isLoggedIn}
                  type="text"
                  value={review_body}
                  onChange={(event) => {
                    setReview_Body(event.target.value);
                  }}
                  id="about"
                  name="about"
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md border"
                />
              </div>
            </div>

            <div className="md:col-span-6 col-span-4">
              <label
                htmlFor="designer"
                className="block text-sm font-medium text-gray-700"
              >
                Designer
              </label>
              <input
                disabled={!isLoggedIn}
                value={designer}
                onChange={(event) => {
                  setDesigner(event.target.value);
                }}
                type="text"
                name="name"
                id="name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full md:w-6/12  shadow-sm sm:text-sm border-gray-300 rounded-md border"
              />
            </div>

            <div className="md:col-span-6 col-span-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                disabled={!isLoggedIn}
                defaultValue="Choose category"
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
                id="category"
                name="category"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm md:w-6/12"
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
            </div>
          </div>
          <div className="py-3">
            {isLoggedIn ? (
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Review
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login to submit Review
              </button>
            )}
            {emptyForm ? <p className="text-red-600">*All areas need to be filled in</p> : null}
            {sentForm && <p className="text-lime-600">Your review has been submitted!!</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
