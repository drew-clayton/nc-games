import { createContext, useEffect, useState } from "react";
import { getCategories } from "../utils/api";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState();

  // useEffect(() => {
  //   return getCategories().then((res) => {
  //     setCategories(res);
  //   });
  // }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
