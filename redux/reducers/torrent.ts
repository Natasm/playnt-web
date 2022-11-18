import { createSlice } from "@reduxjs/toolkit";
import { TorrentState } from "../state/torrent";

export const torrentReducer = createSlice({
    name: 'torrent',
    initialState: new TorrentState({}),
    reducers: {
        setInfoHashTorrentReducer: (state, { payload }) => {
            return new TorrentState({ ...state, infoHash: payload })
        },
        setUriStreamFileTorrentReducer: (state, { payload }) => {
            return new TorrentState({ ...state, uriStreamFile: payload })
        },
    }
})

export default torrentReducer.reducer