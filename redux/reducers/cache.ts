import { createSlice } from "@reduxjs/toolkit";
import { CacheGlobal } from "../state/global";

export const cacheGlobal = createSlice({
    name: 'cacheGlobal',
    initialState: new CacheGlobal({ filesName: [] }),
    reducers: {
        setCacheGlobal: (state, { payload }) => {
            return new CacheGlobal({ filesName: payload })
        }
    }
})

export default cacheGlobal.reducer