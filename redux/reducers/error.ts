import { createSlice } from "@reduxjs/toolkit";
import { ErrorState } from "../state/error";

export const errorReducer = createSlice({
    name: 'error',
    initialState: new ErrorState({ errorMessage: '', severity: '' }),
    reducers: {
        setErrorMessage: (state, { payload }) => {
            return new ErrorState({ ...state, errorMessage: payload })
        },
        setSeverityError: (state, { payload }) => {
            return new ErrorState({ ...state, severity: payload })
        },
    }
})

export default errorReducer.reducer