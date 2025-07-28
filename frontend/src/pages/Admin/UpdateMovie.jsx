import { useEffect, useMemo, useState } from "react";
import { getIdMovie, updateMovie } from "../../redux/apiMovie";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";

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
  });
  const [previews, setPreviews] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user.accessToken;
  const axiosJWT = useMemo(() => createAxios(user, dispatch), [user, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getIdMovie(id, dispatch, accessToken, axiosJWT);
      if (data) {
        setMovie(data);
      }
    };
    fetchData();
  }, [id, dispatch, accessToken, axiosJWT]);

  const handleUpdateMovie = (e) => {
    e.preventDefault();
    updateMovie(id, movie, dispatch, accessToken, axiosJWT);
    navigate('/admin/manage-movie');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, key, previewKey) => {
    const file = e.target.files[0];
    if (file) {
      if (previews[previewKey]) {
        URL.revokeObjectURL(previews[previewKey]);
      }
      setMovie((prev) => ({ ...prev, [key]: file }));
      setPreviews((prev) => ({ ...prev, [previewKey]: URL.createObjectURL(file) }));
    }
  };

  return (
    <div className="">
      <h1 className="font-bold text-3xl text-center p-5">Cập nhật phim</h1>
      <form onSubmit={handleUpdateMovie}>
        <div className="w-[700px] mx-auto space-y-1 rounded-xl bg-[#151921b4] p-10 flex flex-col justify-center">
          <label className="block text-white font-semibold mb-1">Tên phim</label>
          <input
            type="text"
            name="title"
            value={movie.title || ""}
            onChange={handleChange}
            className="px-3 py-2 mb-2 w-[600px] rounded-2xl"
          />

          <label className="block text-white font-semibold mb-1">Mô tả</label>
          <input
            type="text"
            name="description"
            value={movie.description || ""}
            onChange={handleChange}
            className="px-3 py-2 mb-2 w-[600px] rounded-2xl"
          />

          {/* Poster */}
          <label className="block text-white font-semibold mb-1">Ảnh chính</label>
          <div className="w-[600px]">
            <label htmlFor="poster" className="flex items-center justify-center py-6 px-4 bg-white text-sky-600 border-2 border-dashed border-sky-300 rounded-2xl cursor-pointer hover:bg-sky-50 transition">
              {movie.poster ? "Đã chọn ảnh, bấm để đổi" : "Chọn ảnh để tải lên"}
            </label>
            <input id="poster" type="file" name="poster" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'poster', 'poster')} />
            {previews.poster && <img src={previews.poster} className="mt-4 rounded-xl w-full object-cover h-[300px]" alt="preview" />}
          </div>

          {/* Poster2 */}
          <label className="block text-white font-semibold mb-1">Ảnh nền</label>
          <div className="w-[600px]">
            <label htmlFor="poster2" className="flex items-center justify-center py-6 px-4 bg-white text-sky-600 border-2 border-dashed border-sky-300 rounded-2xl cursor-pointer hover:bg-sky-50 transition">
              {movie.poster2 ? "Đã chọn ảnh, bấm để đổi" : "Chọn ảnh để tải lên"}
            </label>
            <input id="poster2" type="file" name="poster2" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'poster2', 'poster2')} />
            {previews.poster2 && <img src={previews.poster2} className="mt-4 rounded-xl w-full object-cover h-[300px]" alt="preview" />}
          </div>

          {/* Các trường còn lại tương tự */}
          {/* Trailer, video, releaseYear, country, duration, status... */}

          <div className="flex items-center justify-center p-5">
            <button type="submit" className="bg-[rgb(46,112,194)] px-6 py-3 text-white rounded-lg">Cập nhật phim</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateMovieId;
