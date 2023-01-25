import { useEffect } from 'react'
import { useAppDispatch } from 'state'
import { useSelector } from 'react-redux'
import useRefresh from 'hooks/useRefresh'
import { State, LaunchState } from '../types'
import { fetchLaunchDataAsync } from '.'

export const useFetchLaunch = (account) => {
  const { fastRefresh, slowRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchLaunchDataAsync(account))
  }, [dispatch, slowRefresh, account])
}

export const useLaunch = (): { launch: LaunchState } => {
  const { start, end, balance, softCapReached, finalized, contribution } = useSelector((state: State) => ({
    start: state.launch.start,
    end: state.launch.end,
    balance: state.launch.balance,
    softCapReached: state.launch.softCapReached,
    finalized: state.launch.finalized,
    contribution: state.launch.contribution,
  }))
  const launch = {
    start,
    end,
    balance,
    softCapReached,
    finalized,
    contribution,
  }
  return { launch }
}