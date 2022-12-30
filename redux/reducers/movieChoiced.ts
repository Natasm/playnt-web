import { createSlice } from "@reduxjs/toolkit";
import { MovieChoicedState } from "../state/movieChoiced";

export const movieChoicedReducer = createSlice({
    name: 'movieChoiced',
    initialState: new MovieChoicedState({}),
    reducers: {
        setMovieChoicedReducer: (state, { payload }) => {
            return new MovieChoicedState({ ...state, movie: payload })
        },
        setTMDBMovieChoicedReducer: (state, { payload }) => {
            return new MovieChoicedState({ ...state, tmdb: payload })
        },
        resetMovieChoicedReducer: () => {
            return new MovieChoicedState({})
        },
    }
})

export default movieChoicedReducer.reducer