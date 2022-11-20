import { Dispatch } from "redux"
import { setLoadingReducer, setMovieChoicedReducer } from "../../../../redux/actions"
import { findMovie, postMovieWebscraper } from "../../../../services/catalog"
import { MovieWebScraper } from "../../../../services/catalog/interface/webscraper.interface"

export const postMovieWebScraperAction = (movie: MovieWebScraper) => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingReducer(true))

            var movieResponse = await postMovieWebscraper(movie)

            var movieFound = await findMovie({ id: movieResponse.data.id })

            dispatch(setMovieChoicedReducer(movieFound.data))

        } catch (e) {
            console.log(e)
        }
        finally {
            dispatch(setLoadingReducer(false))
        }
    }
}
