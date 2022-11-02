import { createSlice } from "@reduxjs/toolkit";
import { MediaPage } from "../state/media";

export const mediaPage = createSlice({
    name: 'mediaPage',
    initialState: new MediaPage({
        page: 0,
        hasMoreItems: true
    }),
    reducers: {
        addPage: (state) => {
            return new MediaPage({
                page: state.page + 1,
                hasMoreItems: state.hasMoreItems
            })
        },
        clearPage: (state) => {
            return new MediaPage({
                page: 0,
                hasMoreItems: state.hasMoreItems
            })
        },
        setHasMoreItems: (state, { payload }) => {
            return new MediaPage({
                page: state.page,
                hasMoreItems: payload
            })
        }
    }
})

export default mediaPage.reducer