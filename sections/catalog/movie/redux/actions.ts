import { Dispatch } from "redux"
import { setLoadingReducer, setMovieChoicedReducer } from "../../../../redux/actions"
import { MovieCatalogResponse } from "../../../../services/catalog/interface/response.interface"
import { upsertMovie } from "../../../../services/stream/movie"
import { UpsertMovieRequest } from "../../../../services/stream/interface/request.interface"

export const postMovieAction = (movie: MovieCatalogResponse) => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingReducer(true))

            var upsertMovieRequest: UpsertMovieRequest = {
                movie: movie
            }

            var movieResponse = await upsertMovie(upsertMovieRequest)

            dispatch(setMovieChoicedReducer(movieResponse))

        } catch (e) {
            console.log(e)
        }
        finally {
            dispatch(setLoadingReducer(false))
        }
    }
}
