import { createSlice } from "@reduxjs/toolkit";
import { CacheState } from "../state/cache";

export const cacheReducer = createSlice({
    name: 'cache',
    initialState: new CacheState({}),
    reducers: {
        setCacheReducer: (state, { payload }) => {
            return new CacheState({ ...state, filesName: payload })
        }
    }
})

export default cacheReducer.reducer