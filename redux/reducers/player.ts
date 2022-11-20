import { createSlice } from "@reduxjs/toolkit";
import { PlayerState } from "../state/player";

export const playerReducer = createSlice({
    name: 'player',
    initialState: new PlayerState({}),
    reducers: {
        setPermissionToHideControlsPlayerReducer: (state, { payload }) => {
            return new PlayerState({ ...state, permissionToHideControls: payload })
        },
        setTitleTypePlayerReducer: (state, { payload }) => {
            return new PlayerState({ ...state, titleType: payload })
        },
        setWatchedTillPlayerReducer: (state, { payload }) => {
            return new PlayerState({ ...state, watchedTill: payload })
        },
        setFileNameStreamPlayerReducer: (state, { payload }) => {
            return new PlayerState({ ...state, fileNameStream: payload })
        },
        setInfoHashPlayerReducer: (state, { payload }) => {
            return new PlayerState({ ...state, infoHash: payload })
        },
        resetPlayerReducer: () => {
            return new PlayerState({})
        }
    }
})

export default playerReducer.reducer