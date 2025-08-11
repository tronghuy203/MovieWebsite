import {
    createReviewFailed,
    createReviewStart,
  createReviewSuccess,
  getReviewFailed,
  getReviewStart,
  getReviewSuccess,
} from "./reviewSlice";

export const getReview = async (reviewId, dispatch, axiosJWT) => {
  dispatch(getReviewStart());
  try {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_SERVERURL}/v1/review/getReviewId/${reviewId}`
    );
    dispatch(getReviewSuccess(res.data));
  } catch (error) {
    dispatch(getReviewFailed());
  }
};

export const createReview = async (review,dispatch, axiosJWT) => {
  dispatch(createReviewStart());
  try {
    const res = await axiosJWT.post(
      `${process.env.REACT_APP_SERVERURL}/v1/review/addReview`,review
    );
    dispatch(createReviewSuccess(res.data));
  } catch (error) {
    dispatch(createReviewFailed());
  }
};
