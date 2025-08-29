import { useEffect, useMemo, useState } from "react";
import { getIdMovie } from "../../redux/apiMovie";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { getLoginSuccess } from "../../redux/authSlice";
import { createReview, getReview } from "../../redux/apiReview";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

const IntroduceMovie = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const review = useSelector((state) => state.review.review?.dataReview);
  const dataIdMovie = useSelector(
    (state) => state.movie.getIdMovie?.dataIdMovie
  );
  const accessToken = user?.accessToken;
  const axiosJWT = useMemo(
    () => createAxios(user, dispatch, getLoginSuccess),
    [user, dispatch]
  );

  useEffect(() => {
    getIdMovie(id, dispatch, axiosJWT);
    getReview(id, dispatch, axiosJWT);
  }, [user, navigate, id, dispatch, axiosJWT]);

  const handleCreateReview = async () => {
    const newReview = {
      comment,
      movieId: id,
    };
    await createReview(newReview, dispatch, axiosJWT);
    await getReview(id, dispatch, axiosJWT);
  };

  const formatDuration = (duration) => {
    if (duration >= 60) {
      return `${Math.floor(duration / 60)} giờ ${duration % 60} phút`;
    }
    return `${duration} phút`;
  };

  return (
    <div className="relative bg-[#191b24] w-full ">
      {dataIdMovie && (
        <div className="">
          <div className="">
            <img
              src={dataIdMovie.posterUrl2}
              alt={dataIdMovie.title}
              className="relative w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/90 via-transparent to-black/10"></div>
          </div>

          <div className="relative lg:flex bg-[#191b24] w-full h-auto -mt-10">
            <div className="lg:w-[500px]">
              <div className="p-10 text-white space-y-4">
                <div className="flex flex-col items-center lg:items-start space-y-4">
                  <img
                    src={dataIdMovie.posterUrl}
                    alt={dataIdMovie.title}
                    className="w-44 h-60 rounded-lg"
                  />
                  <h1 className="text-2xl">{dataIdMovie.title}</h1>
                  <h1 className="text-sm text-amber-200">
                    {dataIdMovie.title}
                  </h1>
                </div>

                <div className="flex gap-4">
                  {dataIdMovie.category?.map((cat) => (
                    <div className="relative mx-auto lg:mx-0 text-white w-24 mt-2">
                      <div className="absolute inset-0 bg-black opacity-30 rounded-lg z-0"></div>
                      <div className="relative flex z-10 p-1 justify-center">
                        <span key={cat._id}>{cat.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="py-3 flex justify-center lg:justify-start">
                  <Link to={`/watch/${dataIdMovie._id}`}>
                    <button className="bg-gradient-to-r from-[rgb(205,171,21)] to-[rgb(240,224,150)] text-black font-bold w-28 h-10 rounded-full ">
                      Xem ngay
                    </button>
                  </Link>
                </div>
                <div className="w-80">
                  <p className="text-[15px]">Giới thiệu:</p>
                  <p className="text-sm text-[rgba(215,217,206,0.6)]">
                    {dataIdMovie.description}
                  </p>
                </div>
                <div>
                  <p className="text-[15px]">
                    Năm:{" "}
                    <span className="text-[rgba(255,255,255,0.73)]">
                      {dataIdMovie.releaseYear}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-[15px]">
                    Thời lượng:{" "}
                    <span className="text-[rgba(255,255,255,0.73)]">
                      {formatDuration(dataIdMovie.duration)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center justify-center py-5">
                {dataIdMovie.trailerUrl && (
                  <div className="lg:p-10 px-10">
                    <div className="w-[300px] lg:w-[700px]">
                      <video key={dataIdMovie.trailerUrl} controls>
                        {" "}
                        <source
                          src={dataIdMovie.trailerUrl}
                          type="video/mp4"
                        ></source>{" "}
                      </video>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-[#ffffff0b] ml-3 w-[350px] lg:w-[670px] h-36 px-3 py-2 flex flex-col justify-center rounded-xl mb-5">
                <textarea
                  type="text"
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Viết bình luận"
                  className=" w-full h-24 rounded-xl py-2 px-3 bg-[#191b24] text-white border-[rgba(113,110,110,0.27)] resize-none overflow-hidden"
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleCreateReview}
                    className="flex gap-2 items-center font-bold text-white"
                  >
                    Gửi <PaperAirplaneIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div>
                {review?.map((review) => (
                  <div key={review._id} className="text-white">
                    <div className="flex space-x-2 ml-3">
                      <img
                        src={review.userId.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h2>{review.userId.username}</h2>
                        <div className="text-[rgba(215,217,206,0.6)] w-[300px] lg:w-[650px] mb-4 ">
                          {review.comment}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default IntroduceMovie;
