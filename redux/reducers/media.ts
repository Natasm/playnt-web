import { createSlice } from "@reduxjs/toolkit";
import { MediaState } from "../state/media";

export const mediaReducer = createSlice({
    name: 'media',
    initialState: new MediaState({}),
    reducers: {
        setInfoHashFromMediaReducer: (state, { payload }) => {
            return new MediaState({ ...state, infoHash: payload })
        },
        setMediaIdReducer: (state, { payload }) => {
            return new MediaState({ ...state, mediaId: payload })
        },
        setInfoFilesFromMediaReducer: (state, { payload }) => {
            return new MediaState({ ...state, infoFiles: payload })
        },
    }
})

export default mediaReducer.reducer