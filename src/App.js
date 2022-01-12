import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Nav";
import UsersList from "./components/UsersList";
import ReviewsList from "./components/ReviewsList";
import ReviewForm from "./components/ReviewForm";
import Review from "./components/Review";
import LoginPage from "./components/LoginPage";

import CommentList from "./components/CommentsList";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/user";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/reviews" element={<ReviewsList />} />
          <Route path="/" element={<ReviewsList />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/review_form" element={<ReviewForm />} />
          <Route path="/reviews/:review_id" element={<Review />} />
          <Route
            path="/reviews/:review_id/comments"
            element={<CommentList />}
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
