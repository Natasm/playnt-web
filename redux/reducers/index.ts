import { combineReducers } from 'redux'

import auth from './auth'
import context from './context'
import cache from './cache'
import catalog from './catalog'
import movieChoiced from './movieChoiced'
import serieChoiced from './serieChoiced'
import mediaChoiced from './mediaChoiced'
import player from './player'
import subtitle from './subtitle'

export default combineReducers({
  auth,
  context,
  cache,
  catalog,
  movieChoiced,
  serieChoiced,
  mediaChoiced,
  player,
  subtitle
})