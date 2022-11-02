import { authReducer } from "../reducers/auth"
import { cacheGlobal } from "../reducers/cache"
import { contextGlobal } from "../reducers/context"
import { errorReducer } from "../reducers/error"
import { loadingGlobal } from "../reducers/loading"
import { media } from "../reducers/media"
import { mediaPage } from "../reducers/mediaPage"
import { mediaOffline } from "../reducers/offline"
import { playerReducer } from "../reducers/player"
import { scrollGlobal } from "../reducers/scroll"
import { searchGlobal } from "../reducers/search"
import { subtitleReducer } from "../reducers/subtitle"
import { torrent } from "../reducers/torrent"

export const { setLoadingGlobal } = loadingGlobal.actions

export const { setRouteActionTriggered } = contextGlobal.actions

export const { setCacheGlobal } = cacheGlobal.actions

export const { setSearchGlobal } = searchGlobal.actions

export const { setToken } = authReducer.actions

export const { setPermissionToHideControlsPlayer } = playerReducer.actions

export const { setSubtitlesRedux, setFilesSubtitleChoicedRedux } = subtitleReducer.actions 

export const { setErrorMessage, setSeverityError } = errorReducer.actions

export const { 
    
    addMedia, addMediaList, clearMedia, setMediaChoiced, clearMediaChoiced, setFilesOfMediaChoiced

} = media.actions

export const { addPage, clearPage, setHasMoreItems } = mediaPage.actions

export const { 
    
    addMediaOffline, addMediaOfflineList, setMediaOffline, setIsMediaOffline, setFilesOfMediaOfflineChoiced,
    clearMediaOffline, setMediaOfflineChoiced, clearMediaOfflineChoiced

} = mediaOffline.actions

export const { setScrollTopPosition, clearScrollTopPosition } = scrollGlobal.actions

export const { setInfoHashTorrent, setUriStreamFileTorrent } = torrent.actions