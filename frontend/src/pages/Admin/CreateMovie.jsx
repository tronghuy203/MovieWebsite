import { useMemo, useState } from "react";
import { createMovie } from "../../redux/apiMovie";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { getLoginSuccess } from "../../redux/authSlice";
import { useNavigate } from 'react-router-dom';

const CreateMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const categoryList = useSelector(
    (state) => state.category.getAllCategory?.dataCategory
  );
  const axiosJWT = useMemo(
    () => createAxios(user, dispatch, getLoginSuccess),
    [user, dispatch]
  );
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    category: [],
    poster: null,
    poster2: null,
    trailer: null,
    video: null,
    releaseYear: "",
    country: "",
    duration: "",
    status: "",
  });
  const handleCreateMovie = (e) => {
    e.preventDefault();
    createMovie(newMovie, dispatch, axiosJWT);
    navigate('/admin/manage-movie')
  };

  return (
    <div className="bg-slate-400 py-12">
      <form onSubmit={handleCreateMovie}>
        <div className="w-[350px] lg:w-[700px] mx-auto space-y-1 rounded-xl bg-[#151921b4] flex flex-col items-center justify-center">
          <h1 className="font-bold text-white  text-3xl text-center p-5">
            Thêm phim
          </h1>

          <div className="flex flex-col mt-5">
            <label className=" text-white font-semibold mb-1">Tên phim</label>
            <input
              type="text"
              name="title"
              placeholder="Nhập tên phim"
              onChange={(e) =>
                setNewMovie((prev) => ({ ...prev, title: e.target.value }))
              }
              className="pl-3 py-2 mb-2 w-[320px] lg:w-[600px]  rounded-lg "
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-white font-semibold mb-1">Mô tả</label>
            <textarea
              type="text"
              name="description"
              placeholder="Nhập nội dung mô tả"
              className="pl-3 py-2 mb-2 w-[320px] lg:w-[600px]  rounded-lg"
              onChange={(e) =>
                setNewMovie((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div className="w-[320px] lg:w-[600px]  py-2">
            <label className=" text-start text-white font-semibold mb-2">
              Thể loại
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categoryList?.map((cat) => (
                <label
                  key={cat._id}
                  className="flex items-center space-x-2 text-white"
                >
                  <input
                    type="checkbox"
                    value={cat._id}
                    checked={newMovie.category.includes(cat._id)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const value = e.target.value;
                      setNewMovie((prev) => ({
                        ...prev,
                        category: checked
                          ? [...prev.category, value]
                          : prev.category.filter((id) => id !== value),
                      }));
                    }}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span>{cat.title}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="block text-white font-semibold mb-1">
              Ảnh chính
            </label>
            <div className="w-[320px] lg:w-[600px]  ">
              <label
                htmlFor="poster"
                className="flex items-center justify-center py-6 px-4 bg-white text-sky-600 border-2 border-dashed border-sky-300 rounded-lg cursor-pointer hover:bg-sky-50 transition"
              >
                <span>
                  {newMovie.poster ? (
                    <div>
                      {newMovie.previewPoster && (
                        <img
                          src={newMovie.previewPoster}
                          alt="Preview Poster"
                          className="mt-4 rounded-xl w-full object-cover h-[300px]"
                        />
                      )}
                    </div>
                  ) : (
                    "Chọn ảnh để tải lên"
                  )}
                </span>
              </label>
              <input
                id="poster"
                type="file"
                name="poster"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    if (newMovie.previewPoster) {
                      URL.revokeObjectURL(newMovie.previewPoster);
                    }

                    setNewMovie((prev) => ({
                      ...prev,
                      poster: file,
                      previewPoster: URL.createObjectURL(file),
                    }));
                  }
                }}
              ></input>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="block text-white font-semibold mb-1">
              Ảnh nền
            </label>

            <div className="w-[320px] lg:w-[600px]  ">
              <label
                htmlFor="poster2"
                className="flex items-center justify-center py-6 px-4 bg-white text-sky-600 border-2 border-dashed border-sky-300 rounded-lg cursor-pointer hover:bg-sky-50 transition"
              >
                <span>
                  {newMovie.poster2 ? (
                    <div>
                      {newMovie.previewPoster2 && (
                        <img
                          src={newMovie.previewPoster2}
                          alt="Preview Poster"
                          className="mt-4 rounded-xl w-full object-cover h-[300px]"
                        />
                      )}
                    </div>
                  ) : (
                    "Chọn ảnh để tải lên"
                  )}
                </span>
              </label>
              <input
                id="poster2"
                type="file"
                name="poster2"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    if (newMovie.previewPoster2) {
                      URL.revokeObjectURL(newMovie.previewPoster2);
                    }

                    setNewMovie((prev) => ({
                      ...prev,
                      poster2: file,
                      previewPoster2: URL.createObjectURL(file),
                    }));
                  }
                }}
              ></input>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="block text-white font-semibold mb-1">
              Trailer
            </label>

            <div className="w-[320px] lg:w-[600px] ">
              <label
                htmlFor="trailer"
                className="flex items-center justify-center px-4 py-6 bg-white text-sky-600 border-2 border-dashed border-sky-300 rounded-lg cursor-pointer hover:bg-sky-50 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0l-4 4m4-4l4 4M17 8v12m0 0l-4-4m4 4l4-4"
                  />
                </svg>
                <span>
                  {newMovie.trailer
                    ? newMovie.trailer.name
                    : "Chọn trailer để tải lên"}
                </span>
              </label>
              <input
                id="trailer"
                type="file"
                name="trailer"
                className="hidden"
                onChange={(e) =>
                  setNewMovie((prev) => ({
                    ...prev,
                    trailer: e.target.files[0],
                  }))
                }
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="block text-white font-semibold mb-1">Video</label>

            <div className=" w-[320px] lg:w-[600px] ">
              <label
                htmlFor="video-upload"
                className="flex items-center justify-center px-4 py-6 bg-white text-sky-600 border-2 border-dashed border-sky-300 rounded-lg cursor-pointer hover:bg-sky-50 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0l-4 4m4-4l4 4M17 8v12m0 0l-4-4m4 4l4-4"
                  />
                </svg>
                <span>
                  {newMovie.video
                    ? newMovie.video.name
                    : "Chọn video để tải lên"}
                </span>
              </label>
              <input
                id="video-upload"
                type="file"
                name="video"
                className="hidden"
                onChange={(e) =>
                  setNewMovie((prev) => ({ ...prev, video: e.target.files[0] }))
                }
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="block text-white font-semibold mb-1">
              Năm sản xuất
            </label>

            <input
              type="text"
              name="releaseYear"
              placeholder="Nhập năm sản xuất"
              className="pl-3 py-2 mb-2 w-[320px] lg:w-[600px]  rounded-lg"
              onChange={(e) =>
                setNewMovie((prev) => ({
                  ...prev,
                  releaseYear: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-white font-semibold mb-1">
              Quốc gia
            </label>

            <input
              type="text"
              name="country"
              placeholder="Nhập quốc gia"
              className="px-3 py-2 mb-2 w-[320px] lg:w-[600px]  rounded-lg"
              onChange={(e) =>
                setNewMovie((prev) => ({ ...prev, country: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-white font-semibold mb-1">
              Thời lượng (phút)
            </label>

            <input
              type="text"
              name="duration"
              placeholder="Nhập thời lượng phim"
              className="px-3 py-2 mb-2 w-[320px] lg:w-[600px]  rounded-lg"
              onChange={(e) =>
                setNewMovie((prev) => ({ ...prev, duration: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-white font-semibold mb-1">
              Trạng thái
            </label>

            <select
              name="status"
              value={newMovie.status}
              className="px-3 py-2 mb-2 w-[320px] lg:w-[600px]  rounded-lg"
              onChange={(e) =>
                setNewMovie((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              <option value="">--Chọn trạng thái--</option>
              <option value="completed">Hoàn thành</option>
              <option value="upcoming">Sắp phát sóng</option>
              <option value="airing">Đang phát sóng</option>
            </select>
          </div>
          <div className="flex items-center justify-center p-10">
            <button
              type="submit"
              className="bg-[rgb(46,112,194)] px-6 py-3 text-white rounded-lg "
            >
              Thêm phim
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateMovie;
