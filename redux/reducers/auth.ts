import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../state/auth";

export const authReducer = createSlice({
    name: 'auth',
    initialState: new AuthState({}),
    reducers: {
        setTokenReducer: (state, { payload } ) => {
            return new AuthState({ ...state, token: payload })
        },
        setUserIdReducer: (state, { payload }) => {
            return new AuthState({ ...state, userId: payload })
        }
    }
})

export default authReducer.reducer