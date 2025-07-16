import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllMovie } from "../../redux/apiMovie";
import { createAxios } from "../../createInstance";
import { MovieSlider } from "./SliderMovie";
import { Category } from "./Category";

const Home = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const movie = useSelector((state) => state.movie.movie?.dataMovie);
  console.log(movie);
  const accessToken = user?.accessToken;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosJWT = useMemo(() => createAxios(user, dispatch), [user, dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    getAllMovie(dispatch, accessToken, axiosJWT);
  }, [user, navigate, dispatch, accessToken, axiosJWT]);

  return (
    <div className="bg-[#191b24]">
      <MovieSlider movieList={movie} />
      <Category/>
    </div>
  );
};

export default Home;
