import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sanitizeId } from './../types/config/helper'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    sessionId: '',
    videoConnected: false,
    loggedIn: false,
    gameOver: false,
    canPlayAgain: false,
    joinLobbyRoom:false,
    tokenId: -1,
    shipName: '',
    tier: 0,
    playerNameMap: new Map(),
  },
  reducers: {
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload
    },
    setVideoConnected: (state, action: PayloadAction<boolean>) => {
      state.videoConnected = action.payload
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload
    },
    setGameOver: (state, action: PayloadAction<boolean>) => {
      state.gameOver = action.payload
    },
    setCanPlayAgain: (state, action: PayloadAction<boolean>) => {
      state.canPlayAgain = action.payload
    },
    setJoinLobbyRoom: (state, action: PayloadAction<boolean>) => {
      state.joinLobbyRoom = action.payload
    },
    setTokenId: (state, action: PayloadAction<number>) => {
      state.tokenId = action.payload
    },
    setShipName: (state, action: PayloadAction<string>) => {
      state.shipName = action.payload
    },
    setTier: (state, action: PayloadAction<number>) => {
      state.tier = action.payload
    },
    setPlayerNameMap: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.playerNameMap.set(sanitizeId(action.payload.id), action.payload.name)
    },
    removePlayerNameMap: (state, action: PayloadAction<string>) => {
      state.playerNameMap.delete(sanitizeId(action.payload))
    },
  },
})

export const {
  setSessionId,
  setVideoConnected,
  setLoggedIn,
  setGameOver,
  setCanPlayAgain,
  setJoinLobbyRoom,
  setTokenId,
  setShipName,
  setTier,
  setPlayerNameMap,
  removePlayerNameMap,
} = userSlice.actions

export default userSlice.reducer
