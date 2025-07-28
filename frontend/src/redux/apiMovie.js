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

export const getAllMovie = async (dispatch, accessToken, axiosJWT) => {
  dispatch(movieStart());
  try {
    const res = await axiosJWT.get("http://localhost:8000/v1/movie", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(movieSuccess(res.data));
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
      `http://localhost:8000/v1/movie/category/${category}`,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
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
    const res = await axiosJWT.get(`http://localhost:8000/v1/movie/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
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
          token: `Bearer ${accessToken}`,
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
        headers: { token: `Bearer ${accessToken}` },
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
    await axiosJWT.delete(`${process.env.REACT_APP_SERVERURL}/v1/movie/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteMovieSuccess());
  } catch (error) {
    dispatch(deleteMovieFailed());
  }
};
