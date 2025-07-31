import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movie: {
      isFetching: false,
      dataMovie: [],
      totalPages: 1,
      currentPage: 1,
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
      error: false,
    },
    createMovie: {
      isFetching: false,
      dataNewMovie: {},
      error: false,
    },
    deleteMovie: {
      isFetching: false,
      success: false,
      error: false,
    },
  },
  reducers: {
    movieStart: (state) => {
      state.movie.isFetching = true;
    },
    movieSuccess: (state, action) => {
      state.movie.isFetching = false;
      state.movie.dataMovie = action.payload.dataMovie;
      state.movie.totalPages = action.payload.totalPages;
      state.movie.currentPage = action.payload.currentPage;
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
      if (!state.movieByCategory.dataMovieByCategory?.result) {
        state.movieByCategory.dataMovieByCategory = {
          result: {},
          getMovie: [],
        };
      }
      state.movieByCategory.dataMovieByCategory.getMovie =
        action.payload.getMovie;
      state.movieByCategory.dataMovieByCategory.result[action.payload.slug] =
        action.payload.getMovie;
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
    createMovieStart: (state)=>{
      state.createMovie.isFetching= true;
    },
    createMovieSuccess: (state,action)=>{
      state.createMovie.isFetching = false; 
      state.createMovie.dataNewMovie = action.payload;
      state.createMovie.error = false;
    },
    createMovieFailed: (state)=>{
      state.createMovie.isFetching = false;
      state.createMovie.error = false;
    },
    updateMovieIdStart: (state) => {
      state.getIdMovie.isFetching = true;
    },
    updateMovieIdSuccess: (state, action) => {
      state.getIdMovie.isFetching = false;
      state.getIdMovie.dataIdMovie = action.payload;
      state.getIdMovie.error = false;
    },
    updateMovieIdFailed: (state) => {
      state.getIdMovie.isFetching = false;
      state.getIdMovie.error = true;
    },
    deleteMovieStart: (state) => {
      state.deleteMovie.isFetching = true;
    },
    deleteMovieSuccess: (state) => {
      state.deleteMovie.isFetching = false;
      state.deleteMovie.success = true;
      state.deleteMovie.error = false;
    },
    deleteMovieFailed: (state) => {
      state.deleteMovie.isFetching = false;
      state.deleteMovie.error = true;
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
  createMovieStart,
  createMovieSuccess,
  createMovieFailed,
  updateMovieIdStart,
  updateMovieIdSuccess,
  updateMovieIdFailed,
  deleteMovieStart,
  deleteMovieSuccess,
  deleteMovieFailed,
} = movieSlice.actions;
export default movieSlice.reducer;
