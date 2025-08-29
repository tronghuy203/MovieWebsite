import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createAxios } from "../../createInstance";
import { getLoginSuccess } from "../../redux/authSlice";
import { createReview, getReview } from "../../redux/apiReview";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

const WatchMovie = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const review = useSelector((state) => state.review.review?.dataReview);
  const accessToken = user?.accessToken;
  const axiosJWT = useMemo(
    () => createAxios(user, dispatch, getLoginSuccess),
    [user, dispatch]
  );
  const dataIdMovie = useSelector(
    (state) => state.movie.getIdMovie?.dataIdMovie
  );

  useEffect(() => {
    getReview(id, dispatch, axiosJWT);
  }, [user, navigate, id, dispatch, accessToken, axiosJWT]);

  const handleCreateReview = async () => {
    const newReview = {
      comment,
      movieId: id,
    };
    await createReview(newReview, dispatch, axiosJWT);
    await getReview(id, dispatch, axiosJWT);
  };

  return (
    <div className="relative bg-[#191b24] w-full h-full pt-20">
      {dataIdMovie && (
        <div className="w-full text-white">
          <video
            controls
            src={dataIdMovie.videoUrl}
            alt={dataIdMovie.title}
            className="text-white w-full p-10"
          ></video>
        </div>
      )}
      <h1 className="text-white font-bold text-2xl ml-10">Bình luận</h1>
      <div className="bg-[#ffffff0b] w-[750px] h-36 px-3 py-2 flex flex-col justify-center rounded-xl mx-10 my-5 ">
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
      <div className="ml-10 py-6">
        {review?.map((review) => (
          <div key={review._id} className="text-white">
            <div className="flex space-x-2">
              <img
                src={review.userId.avatar}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2>{review.userId.username}</h2>
                <div className="text-[rgba(215,217,206,0.6)] w-[700px] mb-4">
                  {review.comment}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default WatchMovie;
