import { createSlice } from "@reduxjs/toolkit";
import { MediaOffline } from "../state/media";

export const mediaOffline = createSlice({
    name: 'mediaOffline',
    initialState: new MediaOffline({
        media: [],
        mediaChoiced: {},
        mediaChoicedFiles: [],
        isMediaOffline: false
    }),
    reducers: {
        addMediaOffline: (state, { payload }) => {
            return new MediaOffline({
                media: [...state.media, payload],
                mediaChoiced: state.mediaChoiced,
                mediaChoicedFiles: state.mediaChoicedFiles,
                isMediaOffline: state.isMediaOffline
            })
        },
        addMediaOfflineList: (state, { payload }) => {
            return new MediaOffline({
                media: state.media.concat(payload),
                mediaChoiced: state.mediaChoiced,
                mediaChoicedFiles: state.mediaChoicedFiles,
                isMediaOffline: state.isMediaOffline
            })
        },
        setMediaOffline: (state, { payload }) => {
            return new MediaOffline({
                media: payload,
                mediaChoiced: state.mediaChoiced,
                mediaChoicedFiles: state.mediaChoicedFiles,
                isMediaOffline: state.isMediaOffline
            })
        },
        setIsMediaOffline: (state, { payload }) => {
            return new MediaOffline({
                media: state.media,
                mediaChoiced: state.mediaChoiced,
                mediaChoicedFiles: state.mediaChoicedFiles,
                isMediaOffline: payload
            })
        },
        setFilesOfMediaOfflineChoiced: (state, { payload }) => {
            return new MediaOffline({
                media: state.media,
                mediaChoiced: state.mediaChoiced,
                mediaChoicedFiles: payload,
                isMediaOffline: state.isMediaOffline
            })
        },
        clearMediaOffline: (state) => {
            return new MediaOffline({
                media: [],
                mediaChoiced: state.mediaChoiced,
                mediaChoicedFiles: state.mediaChoicedFiles,
                isMediaOffline: state.isMediaOffline
            })
        },
        setMediaOfflineChoiced: (state, { payload }) => {
            return new MediaOffline({
                media: state.media,
                mediaChoiced: payload,
                mediaChoicedFiles: state.mediaChoicedFiles,
                isMediaOffline: state.isMediaOffline
            })
        },
        clearMediaOfflineChoiced: (state) => {
            return new MediaOffline({
                media: state.media,
                mediaChoiced: {},
                mediaChoicedFiles: state.mediaChoicedFiles,
                isMediaOffline: state.isMediaOffline
            })
        }
    }
})

export default mediaOffline.reducer