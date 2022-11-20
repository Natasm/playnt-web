import { Dispatch } from "redux"
import { setCacheReducer, setLoadingReducer } from "../../../redux/actions"
import { deleteUserStream, getUserStreamWatching } from "../../../services/catalog"
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


export const removeUserWatchingAction = (userStreamId: number) => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingReducer(true))

            const response = await deleteUserStream(userStreamId)

            if (response?.data) {
                return response.data
            }

        } catch (e) { 
            console.log(e) 
        }
        finally {
            dispatch(setLoadingReducer(false))
        }
    }
}