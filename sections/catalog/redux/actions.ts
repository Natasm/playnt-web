import { Dispatch } from "redux"
import { addPageCatalogReducer, addTitlesCatalogReducer, setInfoFilesFromMediaReducer, setInfoHashFromMediaReducer, setInfoHashPlayerReducer, setLoadingReducer, setMediaIdReducer, setTitlesCatalogReducer } from "../../../redux/actions"
import store from "../../../redux/store"
import { getCatalogList, getCatalogListBySearch } from "../../../services/catalog"
import { postTorrent } from "../../../services/torrent"
import { PostTorrentRequest } from "../../../services/torrent/interface/torrent"

export const loadCatalogAction = (pushData: boolean = false) => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingReducer(true))

            dispatch(addPageCatalogReducer())

            const page = store.getState().catalog.page

            const response = await getCatalogList(page);

            if (pushData) {
                dispatch(addTitlesCatalogReducer(response.data))
            } else {
                dispatch(setTitlesCatalogReducer(response.data))
            }

        } catch (e) { 
            console.log(e) 
        }
        finally { 
            dispatch(setLoadingReducer(false)) 
        }
    }
}

export const loadCatalogBySearchAction = (search: string, pushData: boolean = false) => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingReducer(true))

            dispatch(addPageCatalogReducer())

            const page = store.getState().catalog.page

            const response = await getCatalogListBySearch(search, page);

            if(pushData) {
                dispatch(addTitlesCatalogReducer(response.data))
            } else {
                dispatch(setTitlesCatalogReducer(response.data))
            }

        } catch (e) { 
            console.log(e) 
        }
        finally { 
            dispatch(setLoadingReducer(false)) 
        }
    }
}

export const postTorrentAction = (postTorrentRequest: PostTorrentRequest) => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingReducer(true))

            const response = await postTorrent(postTorrentRequest)

            if (response?.infoFiles && response.infoHash) {
                dispatch(setMediaIdReducer(postTorrentRequest.media_id))
                dispatch(setInfoHashFromMediaReducer(response.infoHash))
                dispatch(setInfoFilesFromMediaReducer(response.infoFiles))
                
                dispatch(setInfoHashPlayerReducer(response.infoHash))
            }

        } catch (e) { console.log(e) }
        finally {
            dispatch(setLoadingReducer(false))
        }
    }
}
