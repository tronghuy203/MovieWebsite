import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    review: {
      isFetching: false,
      dataReview: [],
      error: false,
    },
    createReview: {
      isFetching: false,
      newReview: [],
      error: false,
    },
  },
  reducers: {
    getReviewStart: (state) => {
      state.review.isFetching = true;
    },
    getReviewSuccess: (state, action) => {
      state.review.isFetching = false;
      state.review.dataReview = action.payload;
      state.review.error = false;
    },
    getReviewFailed: (state) => {
      state.review.isFetching = false;
      state.review.error = true;
    },
    createReviewStart: (state) => {
      state.createReview.isFetching = true;
    },
    createReviewSuccess: (state, action) => {
      state.createReview.isFetching = false;
      state.createReview.newReview = action.payload;
      state.createReview.error = false;
    },
    createReviewFailed: (state) => {
      state.createReview.isFetching = false;
      state.createReview.error = true;
    },
    
  },
});

export const {
  getReviewStart,
  getReviewSuccess,
  getReviewFailed,
  createReviewStart,
  createReviewSuccess,
  createReviewFailed,
} = reviewSlice.actions;
export default reviewSlice.reducer;
