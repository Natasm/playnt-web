import { combineReducers } from 'redux'

import auth from './auth'
import context from './context'
import cache from './cache'
import torrent from './torrent'
import player from './player'
import subtitle from './subtitle'

export default combineReducers({
  auth,
  context,
  cache, 
  torrent,
  player,
  subtitle
})