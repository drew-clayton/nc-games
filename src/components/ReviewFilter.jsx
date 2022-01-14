import { useState, useEffect, useContext } from "react";
import { getCategories, getReviews } from "../utils/api";
import { CategoryContext } from "../contexts/category";

const ReviewFilter = ({ setReviews }) => {
  const [category, setCategory] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [orderButton, setOrderButton] = useState(true);
  const { setCategories, categories } = useContext(CategoryContext);

  const sortArr = ["created_at", "votes", "comment_count"];

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
    return getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  return (
    <div className="flex justify-end pt-5 px-10">
      <form>
        <select
          defaultValue="Choose category"
          onChange={handleFilterSelect}
          name="category"
          id="category"
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
        >
          <option value="Sort By" disabled>
            Sort By
          </option>
          {sortArr.map((sortBy) => {
            return (
              <option key={sortBy} value={sortBy}>
                {sortBy}
              </option>
            );
          })}
        </select>
        {orderButton ? (
          <button className="font-medium text-white rounded bg-sky-300 hover:bg-sky-200">
            <svg
              onClick={handleOrderClick}
              id="ASC"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
          </button>
        ) : (
          <button className=" font-medium text-white rounded bg-sky-300 hover:bg-sky-200">
            <svg
              onClick={handleOrderClick}
              id="DESC"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
              />
            </svg>
          </button>
        )}
      </form>
    </div>
  );
};

export default ReviewFilter;
