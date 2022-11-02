import { Dispatch } from "redux";
import { setLoadingGlobal, setMediaOffline } from "../actions";
import { getTorrents } from "../../services/torrent";

export const loadTorrents = () => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingGlobal(true))

            const response = await getTorrents()

            if (response) {
                dispatch(setMediaOffline(response.torrents))
            }

        } catch (e) { console.log(e) }
        finally {
            dispatch(setLoadingGlobal(false))
        }
    }
}