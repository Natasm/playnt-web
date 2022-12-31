import { createSlice } from "@reduxjs/toolkit";
import { MediaChoicedState } from "../state/mediaChoiced";

export const mediaChoicedReducer = createSlice({
    name: 'mediaChoiced',
    initialState: new MediaChoicedState({}),
    reducers: {
        setSerieMediaChoicedReducer: (state, { payload }) => {
            return new MediaChoicedState({ 
                episodeMediaId: payload?.episodeMediaId,
                episodeId: payload?.episodeId,
                seasonId: payload?.seasonId,
                serieId: payload?.serieId 
            })
        },
        setMovieMediaChoicedReducer: (state, { payload }) => {
            return new MediaChoicedState({ 
                movieId: payload?.movieId,
                movieMediaId: payload?.movieMediaId
            })
        },
        resetMediaChoicedReducer: () => {
            return new MediaChoicedState({})
        },
    }
})

export default mediaChoicedReducer.reducer