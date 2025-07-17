import { useEffect, useMemo } from "react";
import { getIdMovie } from "../../redux/apiMovie";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";

const IntroduceMovie = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dataIdMovie = useSelector(
    (state) => state.movie.getIdMovie?.dataIdMovie
  );
  console.log(dataIdMovie);
  const accessToken = user?.accessToken;
  const axiosJWT = useMemo(() => createAxios(user, dispatch), [user, dispatch]);

  useEffect(() => {
    getIdMovie(id, dispatch, accessToken, axiosJWT);
  }, [id, dispatch, accessToken, axiosJWT]);

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
    <div>
      {dataIdMovie && (
        <div className="bg-[#191b24] w-full h-full">
          <div>
            <img
              src={dataIdMovie.posterUrl}
              alt={dataIdMovie.title}
              className="w-full h-96 shadow-lg shadow-slate-700 "

            />
          </div>
          <div className="flex">
            <div className="w-[500px]">
              <div className="p-10 text-white space-y-4">
                <img
                  src={dataIdMovie.posterUrl}
                  alt={dataIdMovie.title}
                  className="w-44 h-60 rounded-lg"
                />
                <h1 className="text-2xl">{dataIdMovie.title}</h1>
                <div className="relative w-20 py-1">
                  <div className="absolute inset-0 bg-white opacity-10 rounded-lg"></div>
                  <p className="relative text-center text-xs">
                    {dataIdMovie.category.title}
                  </p>
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
                <div className="p-10">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      className="w-[700px] h-[400px] rounded-xl"
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
