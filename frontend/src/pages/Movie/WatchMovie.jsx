import { useSelector } from "react-redux";

const WatchMovie = () => {
  const dataIdMovie = useSelector(
    (state) => state.movie.getIdMovie?.dataIdMovie
  );

  return (
    <div className="relative bg-[#191b24] w-full h-full pt-20">
      {dataIdMovie && (
        <div className="w-full text-white">
          <video
            controls
            src={`${process.env.REACT_APP_SERVERURL}/${dataIdMovie.videoUrl}`}
            alt={dataIdMovie.title}
            className="text-white w-full p-10"
          ></video>
        </div>
      )}
    </div>
  );
};
export default WatchMovie;
