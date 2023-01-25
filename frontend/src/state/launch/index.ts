import BigNumber from 'bignumber.js'
import { createSlice } from '@reduxjs/toolkit'
import { LaunchState, AppThunk } from 'state/types'
import { fetchBalance, fetchStartTime, fetchEndTime, fetchSoftCapReached, fetchFinalized, fetchContribution } from './fetchLaunch'

const initialState: LaunchState = {
  start: 0,
  end: 1675080000,
  balance: 0,
  softCapReached: false,
  finalized: false,
  contribution: 0
}

export const fetchLaunchDataAsync = (account): AppThunk => async (dispatch) => {
  let userContribution = 0
  if (account) {
    userContribution = await fetchContribution(account)
  }
  const launchData = {
    start: await fetchStartTime(),
    end: await fetchEndTime(),
    balance: await fetchBalance(),
    softCapReached: await fetchSoftCapReached(),
    finalized: await fetchFinalized(),
    contribution: userContribution
  }

  dispatch(setLaunchData(launchData))
}

export const LaunchSlice = createSlice({
  name: 'Launch',
  initialState,
  reducers: {
    setLaunchData: (state, action) => {
      console.log("sniper: action: ", action.payload)
      const launchData = action.payload
      if (!state.start) {
        state.start = launchData.start
      }
      if (!state.end) {
        state.end = launchData.end
      }      
      state.balance = launchData.balance
      state.softCapReached = launchData.softCapReached
      state.finalized = launchData.finalized
      state.contribution = launchData.contribution
    },
  },
})

// Actions
export const { setLaunchData } = LaunchSlice.actions

export default LaunchSlice.reducer