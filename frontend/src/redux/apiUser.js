import {
  getAllUserFailed,
  getAllUserStart,
  getAllUserSuccess,
  updateUserFailed,
  updateUserStart,
  updateUserSuccess,
} from "./userSlice";

export const getAllUser = async (dispatch, axiosJWT) => {
  dispatch(getAllUserStart());
  try {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_SERVERURL}/v1/user/`
    );
    dispatch(getAllUserSuccess(res.data));
  } catch (error) {
    dispatch(getAllUserFailed());
  }
};

export const updateUserId = async (id, user, dispatch, axiosJWT) => {
  dispatch(updateUserStart());
  try {
    console.log(user)
    const res = await axiosJWT.put(
      `${process.env.REACT_APP_SERVERURL}/v1/user/updateUser/${id}`,
      user
    );
    dispatch(updateUserSuccess(res.data));
  } catch (error) {
    dispatch(updateUserFailed());
  }
};

export const deleteUserId = async (id, axiosJWT) => {
  try {
    await axiosJWT.delete(
      `${process.env.REACT_APP_SERVERURL}/v1/user/deleteUser/${id}`
    );
  } catch (error) {
    console.log(error);
  }
};
