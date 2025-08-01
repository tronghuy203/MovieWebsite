import { useEffect, useMemo, useState } from "react";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../../redux/apiCategory";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { getLoginSuccess } from "../../redux/authSlice";

const Category = () => {
  const [category, setCategory] = useState({
    title: "",
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const getCategory = useSelector(
    (state) => state.category.getAllCategory?.dataCategory
  );
  const axiosJWT = useMemo(
    () => createAxios(user, dispatch, getLoginSuccess),
    [user, dispatch]
  );
  useEffect(() => {
    getAllCategory(dispatch, axiosJWT);
  }, [dispatch, axiosJWT]);
  const handleCreateCategory = async () => {
    await createCategory(category, dispatch, axiosJWT);
    await getAllCategory(dispatch, axiosJWT);
  };
  const handleUpdateCategory = async (id) => {
    await updateCategory(id, { title: editTitle }, dispatch, axiosJWT);
    setEditingCategory(null);
    setEditTitle("");
    await getAllCategory(dispatch, axiosJWT);
  };
  const handleDeleteCategory = async (id) => {
    await deleteCategory(id, dispatch, axiosJWT);
    await getAllCategory(dispatch, axiosJWT);
  };
  return (
    <div className="bg-slate-400 w-full min-h-screen p-8">
      <div
        className="max-w-3xl mx-auto bg-white shadow-2xl shadow-black rounded-xl p-6 
            transition duration-300 transform hover:scale-[1.02] hover:shadow-black/80"
      >
        <h1 className="font-bold text-3xl text-center text-gray-800 mb-6">
          Quản lý thể loại phim
        </h1>

        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Nhập thể loại phim"
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setCategory({ title: e.target.value })}
          />
          <button
            onClick={handleCreateCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Gửi
          </button>
        </div>

        <div className="space-y-4">
          {getCategory.map((cat) => (
            <div
              key={cat._id}
              className="flex items-center justify-between bg-gray-100 rounded-md p-4"
            >
              <div className="text-lg font-medium text-gray-800">
                {cat.title}
              </div>

              {editingCategory === cat._id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1"
                  />
                  <button
                    onClick={() => handleUpdateCategory(cat._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                  >
                    Cập nhật
                  </button>
                  <button
                    onClick={() => {
                      setEditingCategory(null);
                      setEditTitle("");
                    }}
                    className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500"
                  >
                    Hủy
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingCategory(cat._id);
                      setEditTitle(cat.title);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(cat._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
