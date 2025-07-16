import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movie: {
      isFetching: false,
      dataMovie: [],
      error: false,
    },
    category: {
      isFetching: false,
      dataCategory: [],
      error: false,
    },
  },
  reducers: {
    movieStart: (state) => {
      state.movie.isFetching = true;
    },
    movieSuccess: (state, action) => {
      state.movie.isFetching = false;
      state.movie.dataMovie = action.payload;
      state.movie.error = false;
    },
    movieFailed: (state) => {
      state.movie.isFetching = false;
      state.movie.error = true;
    },
    categoryStart: (state) => {
      state.category.isFetching = true;
    },
    categorySuccess: (state, action) => {
      state.category.isFetching = false;
      state.category.dataCategory = action.payload;
      state.category.error = false;
    },
    categoryFailed: (state) => {
      state.category.isFetching = false;
      state.category.error = true;
    },
  },
});

export const {
  movieStart,
  movieSuccess,
  movieFailed,
  categoryStart,
  categorySuccess,
  categoryFailed,
} = movieSlice.actions;
export default movieSlice.reducer;
