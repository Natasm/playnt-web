import { createSlice } from "@reduxjs/toolkit";
import { SearchGlobal } from "../state/global";

export const searchGlobal = createSlice({
    name: 'searchGlobal',
    initialState: new SearchGlobal({ search: '' }),
    reducers: {
        setSearchGlobal: (state, { payload }) => {
            return new SearchGlobal({ search: payload })
        }
    }
})

export default searchGlobal.reducer