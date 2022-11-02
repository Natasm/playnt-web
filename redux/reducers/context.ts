import { createSlice } from "@reduxjs/toolkit";
import { ContextGlobal } from "../state/global";

export const contextGlobal = createSlice({
    name: 'contextGlobal',
    initialState: new ContextGlobal({ routeActionTriggered: '' }),
    reducers: {
        setRouteActionTriggered: (state, { payload }) => {
            return new ContextGlobal({ ...state, routeActionTriggered: payload })
        }
    }
})

export default contextGlobal.reducer