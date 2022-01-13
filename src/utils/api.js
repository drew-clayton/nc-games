import axios from "axios";

const marketApi = axios.create({
  baseURL: `https://myncgames.herokuapp.com/api`,
});

export const getReviews = (category, sort_by, order) => {
  return marketApi
    .get(`/reviews`, { params: { category, sort_by, order } })
    .then((res) => res.data.reviews);
};

export const getUsers = () => {
  return marketApi.get(`/users`).then((res) => res.data.users);
};

export const getCategories = () => {
  return marketApi.get(`/categories`).then((res) => res.data.categories);
};

export const getReview = (id) => {
  return marketApi.get(`/reviews/${id}`).then((res) => res.data.review);
};
export const getComments = (id) => {
  return marketApi.get(`/reviews/${id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const patchVote = (id, inc_votes) => {
  return marketApi
    .patch(`/reviews/${id}`, { inc_votes })
    .then((res) => res.data.review);
};

export const postComment = (id, { username }, { body }) => {
  return marketApi
    .post(`/reviews/${id}/comments`, { username, body })
    .then((res) => {
      return res.data.comment;
    });
};

export const deleteComment = (id) => {
  return marketApi.delete(`/comments/${id}`);
};
