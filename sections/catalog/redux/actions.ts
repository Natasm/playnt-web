import { Dispatch } from "redux"
import {
    addPageCatalogReducer, addTitlesCatalogReducer,
    setHasMoreTitlesCatalogReducer,
    setLoadingReducer, setTitlesCatalogReducer
} from "../../../redux/actions"
import store from "../../../redux/store"
import { getCatalogList, getCatalogListBySearch } from "../../../services/catalog/titles"
import { LoadTorrentRequest } from "../../../services/stream/interface/request.interface"
import { LoadTorrentResponse } from "../../../services/stream/interface/response.interface"
import { loadTorrent } from "../../../services/stream/torrent"

export const loadCatalogAction = (pushData: boolean = false) => {
    return async function (dispatch: Dispatch) {
        try {

            if (store.getState().context.loading) return

            dispatch(setLoadingReducer(true))

            if (pushData) {
                dispatch(addPageCatalogReducer())

                var page = store.getState().catalog.page
            } else {
                var page = 1
            }

            var catalogSource = store.getState().context.catalogSource

            const data = await getCatalogList(page, catalogSource);

            if (data.length == 0) {
                dispatch(setHasMoreTitlesCatalogReducer(false))
            } else {

                dispatch(setHasMoreTitlesCatalogReducer(true))

                if (pushData) {
                    dispatch(addTitlesCatalogReducer(data))
                } else {
                    dispatch(setTitlesCatalogReducer(data))
                }
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

            if (store.getState().context.loading) return
            
            dispatch(setLoadingReducer(true))

            if (pushData) {
                dispatch(addPageCatalogReducer())

                var page = store.getState().catalog.page
            } else {
                var page = 1
            }

            var catalogSource = store.getState().context.catalogSource

            const data = await getCatalogListBySearch(search, page, catalogSource);

            if (data.length == 0) {
                dispatch(setHasMoreTitlesCatalogReducer(false))
            } else {
                
                dispatch(setHasMoreTitlesCatalogReducer(true))
                
                if (pushData) {
                    dispatch(addTitlesCatalogReducer(data))
                } else {
                    dispatch(setTitlesCatalogReducer(data))
                }
            }

        } catch (e) {
            console.log(e)
        }
        finally {
            dispatch(setLoadingReducer(false))
        }
    }
}

export const loadTorrentAction = (loadTorrentRequest: LoadTorrentRequest) => {
    return async function (dispatch: Dispatch): Promise<LoadTorrentResponse | undefined> {
        try {
            dispatch(setLoadingReducer(true))

            const response = await loadTorrent(loadTorrentRequest)

            return response

        } catch (e) { console.log(e) }
        finally {
            dispatch(setLoadingReducer(false))
        }
    }
}
