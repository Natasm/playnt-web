import { createSlice } from "@reduxjs/toolkit";
import { ContextState } from "../state/context";

export const contextReducer = createSlice({
    name: 'context',
    initialState: new ContextState({}),
    reducers: {
        setLoadingReducer: (state, { payload }) => {
            return new ContextState({ ...state, loading: payload })
        },
        setScrollTopPositionReducer: (state, { payload }) => {
            return new ContextState({ ...state, scrollTopPosition: payload })
        },
        clearScrollTopPositionReducer: (state) => {
            return new ContextState({ ...state, scrollTopPosition: 0 })
        },
        setSearchGlobalReducer: (state, { payload }) => {
            return new ContextState({ ...state, search: payload })
        },
        setRouteActionTriggeredReducer: (state, { payload }) => {
            return new ContextState({ ...state, routeActionTriggered: payload })
        }
    }
})

export default contextReducer.reducer