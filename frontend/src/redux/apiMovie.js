import axios from "axios";
import {
  categoryFailed,
  categoryStart,
  categorySuccess,
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
    console.log(res.data);
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
