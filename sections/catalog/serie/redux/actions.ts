import { Dispatch } from "redux"
import { setLoadingReducer, setSerieChoicedReducer } from "../../../../redux/actions"
import { SerieCatalogResponse } from "../../../../services/catalog/interface/response.interface"
import { EpisodeRequest, SeasonRequest, UpsertSerieRequest } from "../../../../services/stream/interface/request.interface"
import { upsertSerie } from "../../../../services/stream/serie"

export const postSerieAction = (serie: SerieCatalogResponse) => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingReducer(true))

            var upsertSerieRequest: UpsertSerieRequest = {
                serie: {
                    ...serie,
                    seasons: serie.seasons.map((season) => {
                        
                        var seasonRequest: SeasonRequest = {
                            
                            seasonNumber: season.seasonNumber,
                            episodes: season.episodes.map((episode) => {
                                
                                var episodeRequest: EpisodeRequest = {
                                    episodeNumber: episode.episodeNumber,
                                    media: episode.media
                                }

                                return episodeRequest
                            })
                        }
                        return seasonRequest
                    })
                }
            }

            var data = await upsertSerie(upsertSerieRequest)

            dispatch(setSerieChoicedReducer(data))

        } catch (e) {
            console.log(e)
        }
        finally {
            dispatch(setLoadingReducer(false))
        }
    }
}