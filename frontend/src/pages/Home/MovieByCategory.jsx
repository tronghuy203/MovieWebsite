import { useEffect, useMemo } from "react";
import { getMovieByCategory } from "../../redux/apiMovie";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getLoginSuccess } from "../../redux/authSlice";

const MovieByCategory = () => {
  const { slug } = useParams();
  const MovieCategory = useSelector(
    (state) => state.movie.movieByCategory?.dataMovieByCategory
  );
  const category = useSelector((state) => state.movie?.category?.dataCategory);
  const currentCategory = category.find((cat) => cat.slug === slug);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);

  const accessToken = user?.accessToken;
  const axiosJWT = useMemo(() => createAxios(user, dispatch,getLoginSuccess), [user, dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    getMovieByCategory(slug, dispatch, accessToken, axiosJWT);
  }, [user, navigate, slug, dispatch, accessToken, axiosJWT]);

  return (
    <div className="bg-[#191b24] w-full h-full lg:h-screen pb-5">
      <div>
        <h1 className="bg-gradient-to-r from-sky-700 to-white text-transparent bg-clip-text p-6 text-2xl font-bold pt-20">
          Thể loại: {currentCategory?.title}
        </h1>
        <div className="flex flex-wrap items-center sm:justify-start justify-center">
          {MovieCategory?.getMovie?.map((movie, index) => (
            <div key={index}>
                <Link to={`movie/${movie._id}`}>
                  {" "}
                  <img
                    src={`${process.env.REACT_APP_SERVERURL}/${movie.posterUrl}`}
                    alt=""
                    className="w-40 h-52 hover:opacity-80 p-5 rounded-3xl"
                  />
                </Link>
                <h1 className="w-32 mx-auto text-white text-center text-[13px]">
                  {movie.title}
                </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieByCategory;
