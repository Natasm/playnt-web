import { createSlice } from "@reduxjs/toolkit";
import { SubtitleState } from "../state/subtitle";

export const subtitleReducer = createSlice({
    name: 'subtitle',
    initialState: new SubtitleState({}),
    reducers: {
        setSubtitlesReducer: (state, { payload }) => {
            return new SubtitleState({ ...state, subtitles: payload })
        },
        setFilesSubtitleChoicedReducer: (state, { payload }) => {
            return new SubtitleState({ ...state, filesSubtitleChoiced: payload })
        }
    }
})

export default subtitleReducer.reducer