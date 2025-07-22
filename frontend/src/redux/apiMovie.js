import axios from "axios";
import {
  categoryFailed,
  categoryStart,
  categorySuccess,
  getIdMovieFailed,
  getIdMovieStart,
  getIdMovieSuccess,
  movieByCategoryFailed,
  movieByCategoryStart,
  movieByCategorySuccess,
  movieFailed,
  movieStart,
  movieSuccess,
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
    const res = await axios.get("http://localhost:8000/v1/category/uniqueCategory");
    dispatch(categorySuccess(res.data));
  } catch (error) {
    dispatch(categoryFailed());
  }
};

export const getMovieByCategory = async(category,dispatch,accessToken,axiosJWT)=>{
  dispatch(movieByCategoryStart());
  try {
    const res = await axiosJWT.get(`http://localhost:8000/v1/movie/category/${category}`,{
      headers: {token: `Bearer ${accessToken}`}
    })
    dispatch(movieByCategorySuccess({ slug: category,
      getMovie: res.data.getMovie,}));
  } catch (error) {
    dispatch(movieByCategoryFailed())
  }
}


export const getIdMovie = async(id,dispatch,accessToken,axiosJWT)=>{
  dispatch(getIdMovieStart());
  try {
    const res = await axiosJWT.get(`http://localhost:8000/v1/movie/${id}`,{
      headers: {token: `Bearer ${accessToken}`}
    })
    dispatch(getIdMovieSuccess(res.data))
  } catch (error) {
    dispatch(getIdMovieFailed())
  }
}