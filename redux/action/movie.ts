import { Dispatch } from "redux";
import store from "../../redux/store";
import { addMediaList, addPage, setLoadingGlobal } from "../actions";
import { getListMedia, getListMediaBySearch } from "../../services/catalog/media";

export const loadMedia = () => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingGlobal(true))
            
            dispatch(addPage())

            const page = store.getState().mediaPage.page

            const response = await getListMedia(page);

            dispatch(addMediaList(response.data))

        } catch (e) { console.log(e) }
        finally { dispatch(setLoadingGlobal(false)) }
    }
}

export const loadMediaBySearch = (search: string) => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingGlobal(true))

            dispatch(addPage())

            const page = store.getState().mediaPage.page

            const response = await getListMediaBySearch(search, page);

            dispatch(addMediaList(response.data))

        } catch (e) { console.log(e) }
        finally { dispatch(setLoadingGlobal(false)) }
    }
}