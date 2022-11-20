import { Dispatch } from "redux"
import { FileSubtitle, Subtitle } from "../../../models/subtitle"
import { setLoadingReducer, setSubtitlesReducer } from "../../../redux/actions"
import { getCatalogList, getCatalogListBySearch, postSerieWebscraper } from "../../../services/catalog"
import { SerieCatalogResponse } from "../../../services/catalog/interface/response.interface"
import { SerieWebScraper } from "../../../services/catalog/interface/webscraper.interface"
import { getSubtitles } from "../../../services/subtitle"

export const searchSubtitleAction = (query: string, page: number) => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingReducer(true))

            const response = await getSubtitles(query, page)

            if (response?.data) {

                var subtitles: Subtitle[] = []

                for await (var element of response.data) {
                    var subtitle = new Subtitle()
                    subtitle.title = element.title
                    subtitle.forced = element.forced
                    subtitle.files = []

                    for await (var file of element.files) {
                        var fileSubtitle = new FileSubtitle()
                        fileSubtitle.id = file.id
                        fileSubtitle.file_name = file.file_name

                        subtitle.files.push(fileSubtitle)
                    }

                    subtitles.push(subtitle)
                }

                dispatch(setSubtitlesReducer(subtitles))
            } else {
                dispatch(setSubtitlesReducer([]))
            }

        } catch (e) {
            dispatch(setSubtitlesReducer([]))
            console.log(e)
        }
        finally {
            dispatch(setLoadingReducer(false))
        }
    }
}

export const getSerieWebscraperFromImdbAndSeasonAction = (imdb: string, seasonNumber: number, page: number = 1) => {
    return async function (dispatch: Dispatch): Promise<SerieWebScraper | undefined> {
        try {
            
            dispatch(setLoadingReducer(true))

            const response = await getCatalogListBySearch(imdb, page)

            if (response.data) {
                
                for await (var title of response.data) {
                    if (title?.serie && title?.serie?.imdb == imdb && title?.serie?.seasons[0].seasonNumber == seasonNumber) {
                        return <SerieWebScraper> title.serie
                    }
                }
            }

        } catch (e) {
            console.log(e)
        }
        finally {
            dispatch(setLoadingReducer(false))
        }
    }
}