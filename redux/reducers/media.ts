import { createSlice } from "@reduxjs/toolkit";
import { Media } from "../state/media";

export const media = createSlice({
    name: 'media',
    initialState: new Media({
        media: [],
        mediaChoiced: {},
        mediaChoicedFiles: []
    }),
    reducers: {
        addMedia: (state, { payload }) => {
            return new Media({ 
                media: [...state.media, payload ], 
                mediaChoiced: state.mediaChoiced, 
                mediaChoicedFiles: state.mediaChoicedFiles
            })
        },
        addMediaList: (state, { payload }) => {
            return new Media({
                media: state.media.concat(payload),
                mediaChoiced: state.mediaChoiced, 
                mediaChoicedFiles: state.mediaChoicedFiles
            })
        },
        clearMedia: (state) => {
            return new Media({
                media: [],
                mediaChoiced: state.mediaChoiced, 
                mediaChoicedFiles: state.mediaChoicedFiles
            })
        },
        setMediaChoiced: (state, { payload }) => {
            return new Media({
                media: state.media,
                mediaChoiced: payload, 
                mediaChoicedFiles: state.mediaChoicedFiles
            })
        },
        clearMediaChoiced: (state) => {
            return new Media({
                media: state.media,
                mediaChoiced: {}, 
                mediaChoicedFiles: state.mediaChoicedFiles
            })
        },
        setFilesOfMediaChoiced: (state, { payload }) => {
            return new Media({
                media: state.media,
                mediaChoiced: state.mediaChoiced, 
                mediaChoicedFiles: payload
            })
        }
    }
})

export default media.reducer