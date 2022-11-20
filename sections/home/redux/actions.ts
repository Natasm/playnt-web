import { Dispatch } from "redux"
import { setCacheReducer, setLoadingReducer } from "../../../redux/actions"
import { getUserStreamWatching } from "../../../services/catalog"
import { deleteDirectoryOrFileListStream, getDirectoryOrFileListStream } from "../../../services/files"

export const loadCacheAction = () => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingReducer(true))

            const response = await getDirectoryOrFileListStream()

            if (response) {
                dispatch(setCacheReducer(response.data.names))
            }

        } catch (e) { console.log(e) }
        finally {
            dispatch(setLoadingReducer(false))
        }
    }
}

export const deleteCacheSelectedAction = (listNamesToDelete: any[]) => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingReducer(true))

            await deleteDirectoryOrFileListStream(listNamesToDelete)

            const response = await getDirectoryOrFileListStream()

            if (response) {
                dispatch(setCacheReducer(response.data.names))
            } else {
                dispatch(setCacheReducer([]))
            }

        } catch (e) { console.log(e) }
        finally {
            dispatch(setLoadingReducer(false))
        }
    }
}


/*export const loadContinueWatchingAction = (userId: number) => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingReducer(true))

            const response = await getUserStreamWatching(userId)

            if (response.data) {
                dispatch(setCacheReducer(response.data.names))
            } else {
                dispatch(setCacheReducer([]))
            }

        } catch (e) { console.log(e) }
        finally {
            dispatch(setLoadingReducer(false))
        }
    }
}*/