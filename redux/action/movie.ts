import { Dispatch } from "redux";
import store from "../../redux/store";
import { findMovie, getCatalogList, getCatalogListBySearch, postMovieWebscraper } from "../../services/catalog";
import { MovieWebScraper } from "../../services/catalog/interface/webscraper.interface";
import { addMediaList, addPage, setLoadingGlobal, setMediaChoiced } from "../actions";

export const loadMedia = () => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingGlobal(true))

            dispatch(addPage())

            const page = store.getState().mediaPage.page

            const response = await getCatalogList(page);

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

            const response = await getCatalogListBySearch(search, page);

            dispatch(addMediaList(response.data))

        } catch (e) { console.log(e) }
        finally { dispatch(setLoadingGlobal(false)) }
    }
}

export const postMovieWebScraperAction = (movie: MovieWebScraper) => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingGlobal(true))

            var movieResponse = await postMovieWebscraper(movie)

            var movieFound = await findMovie({ id: movieResponse.data.id })

            dispatch(setMediaChoiced(movieFound.data))

        } catch (e) {
            console.log(e)
        }
        finally {
            dispatch(setLoadingGlobal(false))
        }
    }
}

  