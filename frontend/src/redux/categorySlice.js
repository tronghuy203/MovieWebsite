import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    getAllCategory: {
      isFetching: false,
      dataCategory: [],
      error: false,
    },
    addCategory: {
      isFetching: false,
      newCategory: {},
      error: false,
    },
    updateCategory: {
      isFetching: false,
      categoryById: {},
      error: false,
    },
    deleteCategory: {
      isFetching: false,
      success: false,
      error: false,
    },
  },
  reducers: {
    getAllCategoryStart: (state) => {
      state.getAllCategory.isFetching = true;
    },
    getAllCategorySuccess: (state, action) => {
      state.getAllCategory.isFetching = false;
      state.getAllCategory.dataCategory = action.payload;
      state.getAllCategory.error = false;
    },
    getAllCategoryFailed: (state) => {
      state.getAllCategory.isFetching = false;
      state.getAllCategory.error = true;
    },
    createCategoryStart: (state) => {
      state.addCategory.isFetching = true;
    },
    createCategorySuccess: (state, action) => {
      state.addCategory.isFetching = false;
      state.addCategory.newCategory = action.payload;
      state.addCategory.error = false;
    },
    createCategoryFailed: (state) => {
      state.addCategory.isFetching = false;
      state.addCategory.error = true;
    },
    updateCategoryStart: (state) => {
      state.updateCategory.isFetching = true;
    },
    updateCategorySuccess: (state, action) => {
      state.updateCategory.isFetching = false;
      state.updateCategory.categoryById = action.payload;
      state.updateCategory.error = false;
    },
    updateCategoryFailed: (state) => {
      state.updateCategory.isFetching = false;
      state.updateCategory.error = true;
    },
    deleteCategoryStart: (state) => {
      state.deleteCategory.isFetching = true;
    },
    deleteCategorySuccess: (state) => {
      state.deleteCategory.isFetching = false;
      state.deleteCategory.success = true;
      state.deleteCategory.error = false;
    },
    deleteCategoryFailed: (state) => {
      state.deleteCategory.isFetching = false;
      state.deleteCategory.error = true;
    },
  },
});
export const {
  getAllCategoryStart,
  getAllCategorySuccess,
  getAllCategoryFailed,
  createCategoryStart,
  createCategorySuccess,
  createCategoryFailed,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailed,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailed,
} = categorySlice.actions;

export default categorySlice.reducer;
