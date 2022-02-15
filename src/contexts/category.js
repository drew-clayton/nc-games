import { createContext, useState } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

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
