import { combineReducers } from 'redux'

import media from './media'
import mediaPage from './mediaPage'
import torrent from './torrent'
import scrollGlobal from './scroll'
import loadingGlobal from './loading'
import offline from './offline'
import cacheGlobal from './cache'
import searchGlobal from './search'
import auth from './auth'
import player from './player'
import subtitle from './subtitle'
import error from './error'
import context from './context'

export default combineReducers({
  media,
  mediaPage,
  torrent,
  offline,
  cacheGlobal,
  scrollGlobal,
  loadingGlobal,
  searchGlobal,
  auth,
  player,
  subtitle,
  error,
  context
})