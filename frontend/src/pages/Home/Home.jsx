import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllMovie } from "../../redux/apiMovie";
import { createAxios } from "../../createInstance";

const Home = ()=>{
    const user = useSelector((state)=> state.auth.login?.currentUser);
    const movie = useSelector((state) => state.movie.movie?.dataMovie)
    console.log(movie);
    const accessToken = user?.accessToken;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const axiosJWT = createAxios(user,dispatch)


    useEffect(()=>{
        if(!user){
            navigate("/login");
        }
        getAllMovie(dispatch,accessToken,axiosJWT)
    });

    return(
        <div>
           {movie.map((movie, index)=>(
          <div>
              <img src=""/>
            <h1>{movie.title}</h1>
            <h3>{movie.description}</h3>
          </div>
           ))}
          
        </div>
    )   
};

export default Home;