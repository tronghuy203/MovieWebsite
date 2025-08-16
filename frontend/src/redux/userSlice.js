import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    getAllUser: {
      isFetching: false,
      dataUser: [],
      error: false,
    },
    getUserById: {
      isFetching: false,
      dataUser: {},
      error: false,
    },
  },
  reducers: {
    getAllUserStart: (state) => {
      state.getAllUser.isFetching = true;
    },
    getAllUserSuccess: (state, action) => {
      state.getAllUser.isFetching = false;
      state.getAllUser.dataUser = action.payload;
      state.getAllUser.error = false;
    },
    getAllUserFailed: (state) => {
      state.getAllUser.isFetching = false;
      state.getAllUser.error = true;
    },
    updateUserStart: (state) => {
      state.getUserById.isFetching = true;
    },
    updateUserSuccess: (state, action) => {
      state.getUserById.isFetching = false;
      state.getUserById.dataUser = action.payload;
    },
    updateUserFailed: (state) => {
      state.getUserById.isFetching = false;
      state.getUserById.error = true;
    },
  },
});
export const {
  getAllUserStart,
  getAllUserSuccess,
  getAllUserFailed,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
} = userSlice.actions;
export default userSlice.reducer;
