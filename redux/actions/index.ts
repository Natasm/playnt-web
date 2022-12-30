import { authReducer } from "../reducers/auth"
import { cacheReducer } from "../reducers/cache"
import { catalogReducer } from "../reducers/catalog"
import { contextReducer } from "../reducers/context"
import { mediaChoicedReducer } from "../reducers/mediaChoiced"
import { movieChoicedReducer } from "../reducers/movieChoiced"
import { playerReducer } from "../reducers/player"
import { serieChoicedReducer } from "../reducers/serieChoiced"
import { subtitleReducer } from "../reducers/subtitle"

export const { 
    setTokenReducer, 
    setUserIdReducer 
} = authReducer.actions

export const { 
    setCacheReducer 
} = cacheReducer.actions

export const { 
    setLoadingReducer, 
    setScrollTopPositionReducer, 
    setSearchReducer,
    setCatalogSourceReducer,
    setRouteActionTriggeredReducer 
} = contextReducer.actions

export const { 
    setTitlesCatalogReducer, 
    setPageCatalogReducer,
    setHasMoreTitlesCatalogReducer,
    addTitlesCatalogReducer,
    addPageCatalogReducer,
    resetCatalogReducer
} = catalogReducer.actions

export const { 
    setMovieChoicedReducer,
    setTMDBMovieChoicedReducer,
    resetMovieChoicedReducer
} = movieChoicedReducer.actions

export const { 
    setSerieChoicedReducer,
    setTMDBSerieChoicedReducer,
    resetSerieChoicedReducer
} = serieChoicedReducer.actions

export const { 
    setMovieMediaIdChoicedReducer,
    setEpisodeMediaIdChoicedReducer,
    setEpisodeIdMediaChoicedReducer,
    setSeasonIdMediaChoicedReducer,
    resetMediaChoicedReducer
} = mediaChoicedReducer.actions

export const { 
    setPermissionToHideControlsPlayerReducer,
    setWatchedTillPlayerReducer,
    setFileNameStreamPlayerReducer,
    setInfoHashPlayerReducer,
    resetPlayerReducer
} = playerReducer.actions

export const { 
    setSubtitlesReducer, setFilesSubtitleChoicedReducer
 } = subtitleReducer.actions
