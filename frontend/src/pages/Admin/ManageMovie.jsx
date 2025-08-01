import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, getAllMovie } from "../../redux/apiMovie";
import { createAxios } from "../../createInstance";
import { Link } from "react-router-dom";
import { getLoginSuccess } from "../../redux/authSlice";
import {ArrowLeftCircleIcon, ArrowRightCircleIcon} from "@heroicons/react/24/outline"

const ManageMovie = () => {
  const [page, setPage] = useState(1);
  const dataMovie = useSelector((state) => state.movie.movie?.dataMovie);
  const totalPages = useSelector((state) => state.movie.movie?.totalPages);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const axiosJWT = useMemo(
    () => createAxios(user, dispatch, getLoginSuccess),
    [user, dispatch]
  );
  useEffect(() => {
    getAllMovie(dispatch, accessToken, axiosJWT, page);
  }, [dispatch, accessToken, axiosJWT, page]);
  const handleDeleteMovie = async (id) => {
    await deleteMovie(id, dispatch, accessToken, axiosJWT);
    getAllMovie(dispatch, accessToken, axiosJWT, page);
  };
  return (
    <div className="bg-slate-400">
      <h1 className="text-center font-bold text-3xl p-5">Quản lý phim</h1>
      <Link to={"/admin/create-movie"}>
        <button className="bg-gradient-to-r from-[rgb(23,106,179)] to-[rgb(19,112,218)] text-white px-5 py-2 rounded-2xl mb-1 ml-12">
          Thêm phim
        </button>
      </Link>
      <table className="w-[90%] min-h-[calc(100vh-200px)] mx-auto bg-white shadow-black shadow-2xl rounded-lg overflow-hidden">
        <thead className="bg-[#252627] text-white h-14 ">
          <tr className="text-center">
            <th>Ảnh</th>
            <th>Tên phim</th>
            <th>Thể loại</th>
            <th>Năm</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody className="bg-slate-300">
          {dataMovie.map((movie) => (
            <tr className="text-center " key={movie._id}>
              <td className="w-[150px] p-2">
                <img
                  src={`${process.env.REACT_APP_SERVERURL}/${movie.posterUrl}`}
                  alt=""
                  className="w-20 h-28 flex mx-auto "
                />
              </td>
              <td className="w-[200px]">{movie.title}</td>
              <td className="w-[200px]">
                {movie.category.map((cat) => (
                  <div
                    key={cat._id}
                    className="flex items-center justify-center py-1"
                  >
                    <div className="bg-[rgba(55,20,20,0.1)] px-3 py-1  rounded-md">
                      {cat.title}
                    </div>
                  </div>
                ))}
              </td>
              <td className="w-[100px]">{movie.releaseYear}</td>
              <td className="w-[100px]">{movie.status}</td>
              <td className="w-[200px]">
                <div className="flex justify-center gap-5">
                  <Link to={`/admin/update-movie/${movie._id}`}>
                    <button className="bg-teal-700 text-white hover:bg-teal-500 px-3 py-1 rounded-lg">
                      sửa
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteMovie(movie._id)}
                    className="bg-red-700 text-white hover:bg-red-500 px-3 py-1 rounded-lg"
                  >
                    xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center h-20">
        <button disabled={page <= 1} onClick={()=>setPage(page - 1)} className="text-black disabled:opacity-30">
          <ArrowLeftCircleIcon className=" w-10 h-10 "/>
        </button>
        <sapn>{page}/ {totalPages}</sapn>
        <button disabled={page >= totalPages} onClick={()=> setPage(page + 1)} className="text-black disabled:opacity-30">
          <ArrowRightCircleIcon className="w-10 h-10"/>
        </button>
      </div>
    </div>
  );
};

export default ManageMovie;
