import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../state/auth";

export const authReducer = createSlice({
    name: 'auth',
    initialState: new AuthState({ token: '' }),
    reducers: {
        setToken: (state, { payload }) => {
            return new AuthState({ ...state, token: payload })
        }
    }
})

export default authReducer.reducer