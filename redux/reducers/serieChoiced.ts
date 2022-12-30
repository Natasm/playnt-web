import { createSlice } from "@reduxjs/toolkit";
import { SerieChoicedState } from "../state/serieChoiced";

export const serieChoicedReducer = createSlice({
    name: 'serieChoiced',
    initialState: new SerieChoicedState({}),
    reducers: {
        setSerieChoicedReducer: (state, { payload }) => {
            return new SerieChoicedState({ ...state, serie: payload })
        },
        setTMDBSerieChoicedReducer: (state, { payload }) => {
            return new SerieChoicedState({ ...state, tmdb: payload })
        },
        resetSerieChoicedReducer: () => {
            return new SerieChoicedState({})
        },
    }
})

export default serieChoicedReducer.reducer