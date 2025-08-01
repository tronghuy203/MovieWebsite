import { createCategoryFailed, createCategoryStart, createCategorySuccess, deleteCategoryFailed, deleteCategoryStart, deleteCategorySuccess, getAllCategoryFailed, getAllCategoryStart, getAllCategorySuccess, updateCategoryFailed, updateCategoryStart, updateCategorySuccess } from "./categorySlice"

export const getAllCategory = async(dispatch,axiosJWT)=>{
    dispatch(getAllCategoryStart());
    try {
        const res = await axiosJWT.get("http://localhost:8000/v1/category");
        dispatch(getAllCategorySuccess(res.data));
    } catch (error) {
        dispatch(getAllCategoryFailed())
    }
}

export const createCategory = async(category,dispatch,axiosJWT)=>{
    dispatch(createCategoryStart());
    try {
        console.log(category)
        await axiosJWT.post("http://localhost:8000/v1/category/addCategory",category)
        dispatch(createCategorySuccess());
    } catch (error) {
        dispatch(createCategoryFailed());
    }
}
export const updateCategory = async(id,updateCategory,dispatch,axiosJWT)=>{
    dispatch(updateCategoryStart());
    try {
        await axiosJWT.put(`http://localhost:8000/v1/category/${id}`,updateCategory);
        dispatch(updateCategorySuccess());
    } catch (error) {
        dispatch(updateCategoryFailed());
    }
}

export const deleteCategory = async(id,dispatch,axiosJWT) =>{
    dispatch(deleteCategoryStart());
    try {
        await axiosJWT.delete(`http://localhost:8000/v1/category/${id}`);
        dispatch(deleteCategorySuccess());
    } catch (error) {
        dispatch(deleteCategoryFailed());
    }
}