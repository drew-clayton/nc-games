import { useState, useEffect } from "react";
import { getCategories, getReviews } from "../utils/api";

const ReviewFilter = ({ setReviews }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortBy, setSortBy] = useState();

  const sortArr = ["created_at", "votes", "comment_count"];

  const handleFilterSelect = (event) => {
    event.preventDefault();
    if (event.target.value === "all") {
      return getReviews().then((res) => {
        setReviews(res);
        setCategory(undefined);
      });
    } else {
      return getReviews(event.target.value).then((res) => {
        setReviews(res);
        setCategory(event.target.value);
      });
    }
  };
  const handleSortBySelect = (event) => {
    event.preventDefault();
    return getReviews(category, event.target.value).then((res) => {
      setReviews(res);
      setSortBy(event.target.value);
    });
  };

  const handleOrderClick = (event) => {
    event.preventDefault();
    return getReviews(category, sortBy, event.target.value).then((res) => {
      setReviews(res);
    });
  };

  useEffect(() => {
    return getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  return (
    <div>
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
          defaultValue="Sort By"
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
        <button onClick={handleOrderClick} value="ASC">
          ASC
        </button>
        <button onClick={handleOrderClick} value="DESC">
          DESC
        </button>
      </form>
    </div>
  );
};

export default ReviewFilter;
