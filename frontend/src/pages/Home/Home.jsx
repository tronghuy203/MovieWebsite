import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllMovie } from "../../redux/apiMovie";
import { createAxios } from "../../createInstance";
import { MovieSlider } from "./SliderMovie";
import { Category } from "./Category";
import { SliderMovieCategory } from "./SliderMovieCategory";
import { getLoginSuccess } from "../../redux/authSlice";

const Home = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const movie = useSelector((state) => state.movie.movie?.dataMovie);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosJWT = useMemo(() => createAxios(user, dispatch, getLoginSuccess), [user, dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    getAllMovie(dispatch, axiosJWT);
  }, [user, navigate, dispatch, axiosJWT]);

  return (
    <div className="bg-[#191b24] h-full lg:h-full">
      <MovieSlider movieList={movie} />
      <Category/>
      <SliderMovieCategory axiosJWT={axiosJWT}/>
    </div>
  );
};

export default Home;
