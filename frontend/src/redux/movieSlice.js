import {createSlice} from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        movie: {
            isFetching: false,
            dataMovie: null,
            error: true,
        }
    },
    reducers: {
        movieStart: (state) =>{
            state.movie.isFetching = true;
        },
        movieSuccess: (state, active) =>{
            state.movie.isFetching = false;
            state.movie.dataMovie = active.payload;
            state.movie.error = false;
        },
        movieFailed: (state) => {
            state.movie.isFetching = false;
            state.movie.error = true;
        }
    }
});

export const {movieStart,movieSuccess,movieFailed} = movieSlice.actions;
export default movieSlice.reducer