import { authReducer } from "../reducers/auth"
import { cacheReducer } from "../reducers/cache"
import { catalogReducer } from "../reducers/catalog"
import { contextReducer } from "../reducers/context"
import { mediaReducer } from "../reducers/media"
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
    setHasMoreItemsCatalogReducer,
    addTitlesCatalogReducer,
    addPageCatalogReducer,
    resetCatalogReducer
} = catalogReducer.actions

export const { 
    setMovieChoicedReducer,
    resetMovieChoicedReducer
} = movieChoicedReducer.actions

export const { 
    setSerieChoicedReducer,
    resetSerieChoicedReducer
} = serieChoicedReducer.actions

export const { 
    setMediaIdReducer,
    setInfoHashFromMediaReducer, 
    setInfoFilesFromMediaReducer,
    resetMediaReducer
} = mediaReducer.actions

export const { 
    setPermissionToHideControlsPlayerReducer,
    setTitleTypePlayerReducer,
    setWatchedTillPlayerReducer,
    setFileNameStreamPlayerReducer,
    setInfoHashPlayerReducer,
    resetPlayerReducer
} = playerReducer.actions

export const { 
    setSubtitlesReducer, setFilesSubtitleChoicedReducer
 } = subtitleReducer.actions
