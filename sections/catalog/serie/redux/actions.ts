import { Dispatch } from "redux"
import { setLoadingReducer, setSerieChoicedReducer } from "../../../../redux/actions"
import { findSerie, postSerieWebscraper } from "../../../../services/catalog"
import { SerieWebScraper } from "../../../../services/catalog/interface/webscraper.interface"

export const postSerieWebScraperAction = (serie: SerieWebScraper) => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingReducer(true))

            var serieResponse = await postSerieWebscraper(serie)

            var serieFound = await findSerie({ id: serieResponse.data.id, season: serie.seasons[0].seasonNumber })

            dispatch(setSerieChoicedReducer(serieFound.data))

        } catch (e) {
            console.log(e)
        }
        finally {
            dispatch(setLoadingReducer(false))
        }
    }
}