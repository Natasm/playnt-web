import { createSlice } from "@reduxjs/toolkit";
import { ScrollGlobal } from "../state/global";

export const scrollGlobal = createSlice({
    name: 'scrollGlobal',
    initialState: new ScrollGlobal({ scrollTopPosition: 0 }),
    reducers: {
        setScrollTopPosition: (state, { payload }) => {
            return new ScrollGlobal({ scrollTopPosition: payload })
        },
        clearScrollTopPosition: (state) => {
            return new ScrollGlobal({ scrollTopPosition: 0 })
        }
    }
})

export default scrollGlobal.reducer