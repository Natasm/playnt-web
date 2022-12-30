import { Dispatch } from "redux"
import { setCacheReducer, setLoadingReducer } from "../../../redux/actions"
import { deleteDirectoryOrFileListStream, getDirectoryOrFileListStream } from "../../../services/stream/cache"
import { DeleteUserStreamRequest } from "../../../services/stream/interface/request.interface"
import { deleteUserStream } from "../../../services/stream/user-stream"

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


export const removeUserStreamAction = (userStreamId: number) => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingReducer(true))

            const deleteUserStreamRequest: DeleteUserStreamRequest = {
                id: userStreamId
            }

            const deleted = await deleteUserStream(deleteUserStreamRequest)

            return deleted

        } catch (e) { 
            console.log(e) 
        }
        finally {
            dispatch(setLoadingReducer(false))
        }
    }
}