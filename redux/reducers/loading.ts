import { createSlice } from "@reduxjs/toolkit";
import { LoadingGlobal } from "../state/global";

export const loadingGlobal = createSlice({
    name: 'loadingGlobal',
    initialState: new LoadingGlobal({ loading: false }),
    reducers: {
        setLoadingGlobal: (state, { payload }) => {
            return new LoadingGlobal({ loading: payload })
        }
    }
})

export default loadingGlobal.reducer