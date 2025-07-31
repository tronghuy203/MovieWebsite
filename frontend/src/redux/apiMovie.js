import axios from "axios";
import {
  categoryFailed,
  categoryStart,
  categorySuccess,
  createMovieFailed,
  createMovieStart,
  createMovieSuccess,
  deleteMovieFailed,
  deleteMovieStart,
  deleteMovieSuccess,
  getIdMovieFailed,
  getIdMovieStart,
  getIdMovieSuccess,
  movieByCategoryFailed,
  movieByCategoryStart,
  movieByCategorySuccess,
  movieFailed,
  movieStart,
  movieSuccess,
  updateMovieIdFailed,
  updateMovieIdStart,
  updateMovieIdSuccess,
} from "./movieSlice";

export const getAllMovie = async (
  dispatch,
  accessToken,
  axiosJWT,
  page = 1,
  limit = 5
) => {
  dispatch(movieStart());
  try {
    const res = await axiosJWT.get(
      `http://localhost:8000/v1/movie?page=${page}&limit=${limit}`
    );
    dispatch(
      movieSuccess({
        dataMovie: res.data.movie,
        totalPages: res.data.totalPages,
        currentPage: res.data.page,
      })
    );
  } catch (error) {
    dispatch(movieFailed());
  }
};

export const getUniqueCategory = async (dispatch) => {
  dispatch(categoryStart());
  try {
    const res = await axios.get(
      "http://localhost:8000/v1/category/uniqueCategory"
    );
    dispatch(categorySuccess(res.data));
  } catch (error) {
    dispatch(categoryFailed());
  }
};

export const getMovieByCategory = async (
  category,
  dispatch,
  accessToken,
  axiosJWT
) => {
  dispatch(movieByCategoryStart());
  try {
    const res = await axiosJWT.get(
      `http://localhost:8000/v1/movie/category/${category}`
    );
    dispatch(
      movieByCategorySuccess({ slug: category, getMovie: res.data.getMovie })
    );
  } catch (error) {
    dispatch(movieByCategoryFailed());
  }
};

export const getIdMovie = async (id, dispatch, accessToken, axiosJWT) => {
  dispatch(getIdMovieStart());
  try {
    const res = await axiosJWT.get(`http://localhost:8000/v1/movie/${id}`);
    dispatch(getIdMovieSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getIdMovieFailed());
  }
};

export const createMovie = async (movie, dispatch, accessToken, axiosJWT) => {
  dispatch(createMovieStart());
  try {
    const res = await axiosJWT.post(
      `${process.env.REACT_APP_SERVERURL}/v1/movie/addmovie`,
      movie,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(createMovieSuccess(res.data));
  } catch (error) {
    dispatch(createMovieFailed());
  }
};

export const updateMovie = async (
  id,
  updateMovie,
  dispatch,
  accessToken,
  axiosJWT
) => {
  dispatch(updateMovieIdStart());
  try {
    const res = await axiosJWT.put(
      `${process.env.REACT_APP_SERVERURL}/v1/movie/${id}`,
      updateMovie,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(updateMovieIdSuccess(res.data));
  } catch (error) {
    dispatch(updateMovieIdFailed());
  }
};

export const deleteMovie = async (id, dispatch, accessToken, axiosJWT) => {
  dispatch(deleteMovieStart());
  try {
    await axiosJWT.delete(`${process.env.REACT_APP_SERVERURL}/v1/movie/${id}`);
    dispatch(deleteMovieSuccess());
  } catch (error) {
    dispatch(deleteMovieFailed());
  }
};
