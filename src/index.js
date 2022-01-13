import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserProvider } from "./contexts/user";
import { CategoryProvider } from "./contexts/category";

ReactDOM.render(
  <UserProvider>
    <CategoryProvider>
      <App />
    </CategoryProvider>
  </UserProvider>,
  document.getElementById("root")
);
