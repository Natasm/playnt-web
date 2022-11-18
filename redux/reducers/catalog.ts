import { createSlice } from "@reduxjs/toolkit";
import { CatalogState } from "../state/catalog";

export const catalogReducer = createSlice({
    name: 'catalog',
    initialState: new CatalogState({}),
    reducers: {
        setTitlesCatalogReducer: (state, { payload }) => {
            return new CatalogState({ ...state, titles: payload })
        },
        setPageCatalogReducer: (state, { payload }) => {
            return new CatalogState({ ...state, page: payload })
        },
        setHasMoreItemsCatalogReducer: (state, { payload }) => {
            return new CatalogState({ ...state, hasMoreItems: payload})
        },
        addPageCatalogReducer: (state) => {
            return new CatalogState({ ...state, page: state.page + 1 })
        },
    }
})

export default catalogReducer.reducer