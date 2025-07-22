import { useEffect, useMemo } from "react";
import { getIdMovie } from "../../redux/apiMovie";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";

const IntroduceMovie = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dataIdMovie = useSelector(
    (state) => state.movie.getIdMovie?.dataIdMovie
  );
  const accessToken = user?.accessToken;
  const axiosJWT = useMemo(() => createAxios(user, dispatch), [user, dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    getIdMovie(id, dispatch, accessToken, axiosJWT);
  }, [user, navigate, id, dispatch, accessToken, axiosJWT]);

  const formatDuration = (duration) => {
    if (duration >= 60) {
      return `${Math.floor(duration / 60)} giờ ${duration % 60} phút`;
    }
    return `${duration} phút`;
  };
  const getYoutubeEmbedUrl = (url) => {
    const regex =
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/;
    const match = url.match(regex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return null;
  };

  return (
    <div className="relative bg-[#191b24] w-full ">
      {dataIdMovie && (
        <div className="">
          <div className="">
            <img
              src={dataIdMovie.posterUrl2}
              alt={dataIdMovie.title}
              className="relative w-full h-[500px]"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/90 via-transparent to-black/10"></div>
          </div>

          <div className="relative lg:flex bg-[#191b24] w-full h-auto -mt-24">
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
                  {dataIdMovie.category?.map((cat, index) => (
                    <div className="relative mx-auto lg:mx-0 text-white w-24 mt-2">
                      <div className="absolute inset-0 bg-black opacity-30 rounded-lg z-0"></div>
                      <div className="relative flex z-10 p-1 justify-center">
                        <span key={index}>{cat.title}</span>
                      </div>
                    </div>
                  ))}
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
            <div>
              {dataIdMovie.trailerUrl && (
                <div className="lg:p-10 px-10">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      className="lg:w-[700px] lg:h-[400px] rounded-xl"
                      src={getYoutubeEmbedUrl(dataIdMovie.trailerUrl)}
                      title="Trailer"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default IntroduceMovie;
