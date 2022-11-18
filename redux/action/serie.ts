import { Dispatch } from "redux"
import { findSerie, postSerieWebscraper } from "../../services/catalog"
import { SerieWebScraper } from "../../services/catalog/interface/webscraper.interface"
import { setLoadingGlobal, setMediaChoiced } from "../actions"

export const postSerieWebScraperAction = (serie: SerieWebScraper) => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingGlobal(true))

            var serieResponse = await postSerieWebscraper(serie)

            var serieFound = await findSerie({ id: serieResponse.data.id, season: serie.seasons[0].seasonNumber })

            dispatch(setMediaChoiced(serieFound.data))

        } catch (e) {
            console.log(e)
        }
        finally {
            dispatch(setLoadingGlobal(false))
        }
    }
}