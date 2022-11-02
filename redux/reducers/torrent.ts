import { createSlice } from "@reduxjs/toolkit";
import { Torrent } from "../state/torrent";

export const torrent = createSlice({
    name: 'torrent',
    initialState: new Torrent({
        infoHash: '',
        uriStreamFile: ''
    }),
    reducers: {
        setInfoHashTorrent: (state, { payload }) => {
            return new Torrent({
                infoHash: payload,
                uriStreamFile: state.uriStreamFile
            })
        },
        setUriStreamFileTorrent: (state, { payload }) => {
            return new Torrent({
                infoHash: state.infoHash,
                uriStreamFile: payload
            })
        },
    }
})

export default torrent.reducer