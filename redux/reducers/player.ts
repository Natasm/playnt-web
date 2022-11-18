import { createSlice } from "@reduxjs/toolkit";
import { PlayerState } from "../state/player";

export const playerReducer = createSlice({
    name: 'player',
    initialState: new PlayerState({}),
    reducers: {
        setPermissionToHideControlsPlayerReducer: (state, { payload }) => {
            return new PlayerState({ ...state, permissionToHideControls: payload })
        }
    }
})

export default playerReducer.reducer