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
    movieByCategory: {
      isFetching: false,
      dataMovieByCategory: [],
      error: false,
    },
    getIdMovie: {
      isFetching: false,
      dataIdMovie: {},
      error: true,
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
    movieByCategoryStart: (state) => {
      state.movieByCategory.isFetching = true;
    },
    movieByCategorySuccess: (state, action) => {
      state.movieByCategory.isFetching = false;
      state.movieByCategory.dataMovieByCategory = action.payload;
      state.movieByCategory.error = false;
    },
    movieByCategoryFailed: (state) => {
      state.movieByCategory.isFetching = false;
      state.movieByCategory.error = true;
    },
    getIdMovieStart: (state) => {
      state.getIdMovie.isFetching = true;
    },
    getIdMovieSuccess: (state, action) => {
      state.getIdMovie.isFetching = false;
      state.getIdMovie.dataIdMovie = action.payload;
      state.getIdMovie.error = false;
    },
    getIdMovieFailed: (state) => {
      state.getIdMovie.isFetching = false;
      state.getIdMovie.error = true;
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
  movieByCategoryStart,
  movieByCategorySuccess,
  movieByCategoryFailed,
  getIdMovieStart,
  getIdMovieSuccess,
  getIdMovieFailed,
} = movieSlice.actions;
export default movieSlice.reducer;
