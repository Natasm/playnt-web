import { createSlice } from "@reduxjs/toolkit";
import { MediaChoicedState } from "../state/mediaChoiced";

export const mediaChoicedReducer = createSlice({
    name: 'mediaChoiced',
    initialState: new MediaChoicedState({}),
    reducers: {
        setMovieMediaIdChoicedReducer: (state, { payload }) => {
            return new MediaChoicedState({ ...state, movieMediaId: payload, episodeMediaId: undefined })
        },
        setEpisodeMediaIdChoicedReducer: (state, { payload }) => {
            return new MediaChoicedState({ ...state, episodeMediaId: payload, movieMediaId: undefined })
        },
        setEpisodeIdMediaChoicedReducer: (state, { payload }) => {
            return new MediaChoicedState({ ...state, episodeId: payload })
        },
        setSeasonIdMediaChoicedReducer: (state, { payload }) => {
            return new MediaChoicedState({ ...state, seasonId: payload })
        },
        resetMediaChoicedReducer: () => {
            return new MediaChoicedState({})
        },
    }
})

export default mediaChoicedReducer.reducer