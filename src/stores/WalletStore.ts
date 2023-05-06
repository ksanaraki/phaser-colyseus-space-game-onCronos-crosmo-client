import { createSlice } from '@reduxjs/toolkit'

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    account: '',
    craftInstance: null,
    shooterInstance: null,
    tokenInstance: null,
    pilotInstance: null,
  },
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload
    },
    setCraftInstance: (state, action) => {
      state.craftInstance = action.payload
    },
    setShooterInstance: (state, action) => {
      state.shooterInstance = action.payload
    },
    setTokenInstance: (state, action) => {
      state.tokenInstance = action.payload
    },
    setPilotInstance: (state, action) => {
      state.pilotInstance = action.payload
    },
  },
})

export const {
  setAccount,
  setCraftInstance,
  setShooterInstance,
  setTokenInstance,
  setPilotInstance
} = walletSlice.actions

export default walletSlice.reducer