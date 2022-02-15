import "./App.css";
import Navbar from "./components/Nav";
import ReviewsList from "./components/ReviewsList";
import ReviewForm from "./components/ReviewForm";
import Review from "./components/Review";
import LoginPage from "./components/LoginPage";
import ErrorPage from "./components/ErrorPage";
import CommentList from "./components/CommentsList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/reviews" element={<ReviewsList />} />
        <Route path="/" element={<ReviewsList />} />
        <Route path="/review_form" element={<ReviewForm />} />
        <Route path="/reviews/:review_id" element={<Review />} />
        <Route path="/reviews/:review_id/comments" element={<CommentList />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
