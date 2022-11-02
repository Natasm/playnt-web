import { Dispatch } from "redux"
import { setCacheGlobal, setLoadingGlobal } from "../actions"
import { deleteDirectoryOrFileListStream, getDirectoryOrFileListStream } from "../../services/files"

export const loadCache = () => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingGlobal(true))

            const response = await getDirectoryOrFileListStream()

            if (response) {
                dispatch(setCacheGlobal(response.data.names))
            }

        } catch (e) { console.log(e) }
        finally {
            dispatch(setLoadingGlobal(false))
        }
    }
}

export const deleteCacheSelected = (listNamesToDelete: any[]) => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingGlobal(true))

            await deleteDirectoryOrFileListStream(listNamesToDelete)

            const response = await getDirectoryOrFileListStream()

            if (response) {
                dispatch(setCacheGlobal(response.data.names))
            } else {
                dispatch(setCacheGlobal([]))
            }

        } catch (e) { console.log(e) }
        finally {
            dispatch(setLoadingGlobal(false))
        }
    }
}