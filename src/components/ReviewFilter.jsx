import { useState, useEffect, useContext } from "react";
import { getCategories, getReviews } from "../utils/api";
import { CategoryContext } from "../contexts/category";
import ErrorPage from "./ErrorPage";

const ReviewFilter = ({ setReviews }) => {
  const [category, setCategory] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [orderButton, setOrderButton] = useState(true);
  const { setCategories, categories } = useContext(CategoryContext);
  const [error, setError] = useState(null);

  const sortArr = ["created_at", "votes", "comment_count"];
  const sortArr2 = ["Date", "Votes", "Comments"];

  const handleFilterSelect = (event) => {
    event.preventDefault();
    setOrderButton(true);
    if (event.target.value === "all") {
      return getReviews(undefined, sortBy).then((res) => {
        setReviews(res);
        setCategory(undefined);
      });
    } else {
      return getReviews(event.target.value, sortBy).then((res) => {
        setReviews(res);
        setCategory(event.target.value);
      });
    }
  };
  const handleSortBySelect = (event) => {
    event.preventDefault();
    setOrderButton(true);
    return getReviews(category, event.target.value).then((res) => {
      setReviews(res);
      setSortBy(event.target.value);
    });
  };

  const handleOrderClick = (event) => {
    event.preventDefault();
    let order;
    orderButton ? (order = "ASC") : (order = "DESC");
    setOrderButton((curr) => !curr);
    return getReviews(category, sortBy, order).then((res) => {
      setReviews(res);
    });
  };

  useEffect(() => {
    return getCategories()
      .then((res) => setCategories(res))
      .catch((err) => {
        console.log(err);
        setError({ err });
      });
  }, [setCategories]);

  if (error) {
    return <ErrorPage message={error.body.msg} />;
  }
  return (
    <div className="flex justify-end pt-5 px-10">
      <form>
        <select
          defaultValue="All"
          onChange={handleFilterSelect}
          name="category"
          id="category"
          className="py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm capitalize"
        >
          <option value="Choose category" disabled>
            Choose Category
          </option>
          <option value="all">all</option>
          {categories.map((category) => {
            return (
              <option key={category.slug} value={category.slug}>
                {category.slug}
              </option>
            );
          })}
        </select>
        <select
          defaultValue="Created_at"
          onChange={handleSortBySelect}
          name="Sort By"
          id="Sort By"
          className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm capitalize"
        >
          <option value="Sort By" disabled>
            Sort By
          </option>
          {sortArr.map((sortBy, i) => {
            return (
              <option key={sortBy} value={sortBy}>
                {sortArr2[i]}
              </option>
            );
          })}
        </select>
        {orderButton ? (
          <button
            className="pb-2 font-medium text-white rounded-lg h-8 bg-blue-200 hover:bg-blue-300"
            onClick={handleOrderClick}
            id="ASC"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pt-1 h-6 w-8"
              viewBox="0 0 18 18"
              fill="currentColor"
            >
              <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleOrderClick}
            id="DESC"
            className="pb-2 font-medium text-white rounded-lg h-8 bg-blue-200 hover:bg-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pt-1 h-6 w-8"
              viewBox="0 0 18 18"
              fill="currentColor"
            >
              <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
            </svg>
          </button>
        )}
      </form>
    </div>
  );
};

export default ReviewFilter;
