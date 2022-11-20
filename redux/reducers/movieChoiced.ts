import { createSlice } from "@reduxjs/toolkit";
import { MovieChoicedState } from "../state/movieChoiced";

export const movieChoicedReducer = createSlice({
    name: 'movieChoiced',
    initialState: new MovieChoicedState({}),
    reducers: {
        setMovieChoicedReducer: (state, { payload }) => {
            return new MovieChoicedState({ ...state, movie: payload })
        }
    }
})

export default movieChoicedReducer.reducer