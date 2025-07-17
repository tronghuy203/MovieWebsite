import { useEffect, useMemo } from "react";
import { getMovieByCategory } from "../../redux/apiMovie";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { Link, useParams } from "react-router-dom";

const MovieByCategory = () => {
  const { slug } = useParams();
  const MovieCategory = useSelector(
    (state) => state.movie.movieByCategory?.dataMovieByCategory
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);

  const accessToken = user?.accessToken;
  const axiosJWT = useMemo(() => createAxios(user, dispatch), [user, dispatch]);

  useEffect(() => {
    getMovieByCategory(slug, dispatch, accessToken, axiosJWT);
  }, [slug, dispatch, accessToken, axiosJWT]);

  return (
    <div className="bg-[#191b24] w-full h-screen">
      <div>
        <h1 className="bg-gradient-to-r from-sky-700 to-white text-transparent bg-clip-text p-6 text-2xl font-bold">
          Thể loại: {MovieCategory[0]?.category.title}
        </h1>
        <div className="flex flex-wrap item-center sm:justify-start justify-center">
          {MovieCategory?.map((movie, index) => (
            <div key={index}>
              <div>
                <Link to={`movie/${movie._id}`}>
                  {" "}
                  <img
                    src={movie.posterUrl}
                    alt=""
                    className="w-40 h-52 hover:opacity-80 p-5 rounded-3xl"
                  />
                </Link>
                <h1 className="text-white text-center text-[13px]">
                  {movie.title}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieByCategory;
