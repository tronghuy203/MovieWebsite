import { useEffect, useMemo, useState } from "react";
import { getIdMovie, updateMovie } from "../../redux/apiMovie";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { getLoginSuccess } from "../../redux/authSlice";

const UpdateMovieId = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    poster: null,
    poster2: null,
    trailer: null,
    video: null,
    releaseYear: "",
    country: "",
    duration: "",
    status: "",
    previewPoster: null,
    previewPoster2: null,
  });
  console.log(movie);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user.accessToken;
  const axiosJWT = useMemo(() => createAxios(user, dispatch, getLoginSuccess), [user, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getIdMovie(id, dispatch, accessToken, axiosJWT);
      if (data) {
        setMovie({
          ...data,
          trailer: data.trailerUrl,
          video: data.videoUrl,
          previewPoster: `${process.env.REACT_APP_SERVERURL}/${data.posterUrl}`,
          previewPoster2: `${process.env.REACT_APP_SERVERURL}/${data.posterUrl2}`,
        });
      }
    };
    fetchData();
  }, [id, dispatch, accessToken, axiosJWT]);

  const handleUpdateMovie = (e) => {
    e.preventDefault();
    updateMovie(id, movie, dispatch, accessToken, axiosJWT);
    navigate("/admin/manage-movie");
  };

  return (
    <div className="">
      <form onSubmit={handleUpdateMovie}>
        <div className="w-[700px] mx-auto space-y-1 rounded-xl bg-[#151921b4] flex flex-col items-center justify-center">
          <h1 className="font-bold text-white text-3xl text-center p-5">
            Cập nhật phim
          </h1>
          <div className="flex flex-col">
            <label className="block text-white font-semibold mb-1">
              Tên phim
            </label>
            <input
              type="text"
              name="title"
              value={movie.title || ""}
              onChange={(e) =>
                setMovie((prev) => ({ ...prev, title: e.target.value }))
              }
              className="pl-3 py-2 mb-2 w-[600px] rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-white font-semibold mb-1">Mô tả</label>
            <textarea
              type="text"
              name="description"
              value={movie.description || ""}
              onChange={(e) =>
                setMovie((prev) => ({ ...prev, description: e.target.value }))
              }
              className="pl-3 py-2 mb-2 w-[600px] rounded-lg"
            />
          </div>
          <div className="w-[600px] flex flex-col">
            <label className="block text-white font-semibold mb-1">
              Ảnh chính
            </label>

            <label
              htmlFor="poster"
              className="flex items-center justify-center px-4 py-6 bg-white text-sky-600 border-2 border-dashed border-sky-300 cursor-pointer rounded-lg hover:bg-sky-50 transition"
            >
              <span>
                {movie.previewPoster ? (
                  <img
                    src={movie.previewPoster}
                    alt="Poster preview"
                    className="rounded-xl w-full object-cover h-[300px]"
                  />
                ) : (
                  "Thêm poster"
                )}
              </span>
            </label>
            <input
              id="poster"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  if (movie.previewPoster) {
                    URL.revokeObjectURL(movie.previewPoster);
                  }
                  setMovie((prev) => ({
                    ...prev,
                    poster: file,
                    previewPoster: URL.createObjectURL(file),
                  }));
                }
              }}
            />
          </div>

          <div className="w-[600px] flex flex-col">
            <label className="block text-white font-semibold mb-1">
              Ảnh nền
            </label>

            <label
              htmlFor="poster2"
              className="flex items-center justify-center px-4 py-6 bg-white text-sky-600 border-2 border-dashed border-sky-300 cursor-pointer rounded-lg hover:bg-sky-50 transition"
            >
              <span>
                {movie.previewPoster2 ? (
                  <img
                    src={movie.previewPoster2}
                    alt="Preview poster2"
                    className="w-full h-[300px] rounded-xl object-cover"
                  />
                ) : (
                  "Thêm trailer"
                )}
              </span>
            </label>
            <input
              id="poster2"
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  if (movie.previewPoster2) {
                    URL.revokeObjectURL(movie.previewPoster2);
                  }
                  setMovie((prev) => ({
                    ...prev,
                    poster2: file,
                    previewPoster2: URL.createObjectURL(file),
                  }));
                }
              }}
            />
          </div>

          <div className="w-[600px] flex flex-col">
            <label className="block text-white font-semibold mb-1">
              Trailer
            </label>

            <label
              htmlFor="trailer"
              className="flex items-center justify-center px-4 py-6 bg-white text-sky-600 border-2 border-dashed border-sky-300 cursor-pointer rounded-lg hover:bg-sky-50 transition"
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
                {movie.trailer
                  ? typeof movie.trailer === "string"
                    ? movie.trailer.split("/").pop().replace(/^\d+-/, "")
                    : movie.trailer.name
                  : "Thêm trailer"}
              </span>
            </label>
            <input
              id="trailer"
              type="file"
              className="hidden"
              onChange={(e) =>
                setMovie((prev) => ({ ...prev, trailer: e.target.files[0] }))
              }
            />
          </div>
          <div className="w-[600px] flex flex-col">
            <label className="block text-white font-semibold mb-1">Video</label>

            <label
              htmlFor="video"
              className="flex items-center justify-center px-4 py-6 bg-white text-sky-600 border-2 border-dashed border-sky-300 cursor-pointer rounded-lg hover:bg-sky-50 transition"
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
                {movie.video
                  ? typeof movie.video === "string"
                    ? movie.video.split("/").pop().replace(/^\d+-/, "")
                    : movie.video.name
                  : "Thêm video"}
              </span>
            </label>
            <input
              id="video"
              type="file"
              className="hidden"
              onChange={(e) =>
                setMovie((prev) => ({ ...prev, video: e.target.files[0] }))
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-white font-semibold mb-1">
              Năm sản xuất
            </label>
            <input
              type="text"
              name="releaseYear"
              value={movie.releaseYear || ""}
              onChange={(e) =>
                setMovie((prev) => ({ ...prev, releaseYear: e.target.value }))
              }
              className="pl-3 py-2 mb-2 w-[600px] rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-white font-semibold mb-1">
              Quốc gia
            </label>
            <input
              type="text"
              name="country"
              value={movie.country || ""}
              onChange={(e) =>
                setMovie((prev) => ({ ...prev, country: e.target.value }))
              }
              className="pl-3 py-2 mb-2 w-[600px] rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-white font-semibold mb-1">
              Thời lượng (phút)
            </label>
            <input
              type="text"
              name="duration"
              value={movie.duration || ""}
              onChange={(e) =>
                setMovie((prev) => ({ ...prev, duration: e.target.value }))
              }
              className="pl-3 py-2 mb-2 w-[600px] rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-white font-semibold mb-1">
              Trạng thái
            </label>

            <select
              name="status"
              value={movie.status}
              className="px-3 py-2 mb-2 w-[600px] rounded-lg"
              onChange={(e) =>
                setMovie((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              <option value="">--Chọn trạng thái--</option>
              <option value="completed">Hoàn thành</option>
              <option value="upcoming">Sắp phát sóng</option>
              <option value="airing">Đang phát sóng</option>
            </select>
          </div>

          <div className="flex items-center justify-center p-5">
            <button
              type="submit"
              className="bg-[rgb(46,112,194)] px-6 py-3 text-white rounded-lg"
            >
              Cập nhật phim
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default UpdateMovieId;
