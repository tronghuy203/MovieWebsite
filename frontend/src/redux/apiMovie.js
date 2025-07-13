import { movieFailed, movieStart, movieSuccess } from "./movieSlice"

export const getAllMovie = async(dispatch,accessToken, axiosJWT) =>{
    dispatch(movieStart());
    try {
        const res = await axiosJWT.get("http://localhost:8000/v1/movie",{
            headers: {token : `Bearer ${accessToken}`}
        });
        dispatch(movieSuccess(res.data));
        console.log(res.data)
    } catch (error) {
        dispatch(movieFailed())
    }
}