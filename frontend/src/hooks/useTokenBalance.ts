import { useEffect, useMemo, useState } from 'react'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { TokenAmount } from '@pancakeswap/sdk'
import { useWeb3React } from '@web3-react/core'
import tokens from 'config/constants/tokens'
import { getBep20Contract, getCakeContract } from 'utils/contractHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { useSingleCallResult } from 'state/multicall/hooks'
import { getPresaleAddress } from 'utils/addressHelpers'
import { simpleRpcProvider } from 'utils/providers'
import useRefresh from './useRefresh'
import useLastUpdated from './useLastUpdated'
import useTokenAllowance from './useTokenAllowance'
import { useTokenContract } from './useContract'

type UseTokenBalanceState = {
  balance: BigNumber
  fetchStatus: FetchStatus
}

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}

const useTokenBalance = (tokenAddress: string) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus
  const [balanceState, setBalanceState] = useState<UseTokenBalanceState>({
    balance: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  })
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress)
      try {
        const res = await contract.balanceOf(account)
        setBalanceState({ balance: new BigNumber(res.toString()), fetchStatus: SUCCESS })
      } catch (e) {
        console.error(e)
        setBalanceState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }))
      }
    }

    if (account) {
      fetchBalance()
    }
  }, [account, tokenAddress, fastRefresh, SUCCESS, FAILED])

  return balanceState
}

export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getCakeContract()
      const supply = await cakeContract.totalSupply()
      setTotalSupply(new BigNumber(supply.toString()))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(BIG_ZERO)
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress)
      const res = await contract.balanceOf('0x000000000000000000000000000000000000dEaD')
      setBalance(new BigNumber(res.toString()))
    }

    fetchBalance()
  }, [tokenAddress, slowRefresh])

  return balance
}

export const useGetBnbBalance = () => {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED)
  const [balance, setBalance] = useState(ethers.BigNumber.from(0))
  const { account } = useWeb3React()
  const { lastUpdated, setLastUpdated } = useLastUpdated()

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const walletBalance = await simpleRpcProvider.getBalance(account)
        setBalance(walletBalance)
        setFetchStatus(FetchStatus.SUCCESS)
      } catch {
        setFetchStatus(FetchStatus.FAILED)
      }
    }

    if (account) {
      fetchBalance()
    }
  }, [account, lastUpdated, setBalance, setFetchStatus])

  return { balance, fetchStatus, refresh: setLastUpdated }
}

export const useGetBusdBalance = () => {
  const { balance, fetchStatus } = useTokenBalance(tokens.busd.address)

  // TODO: Remove ethers conversion once useTokenBalance is converted to ethers.BigNumber
  return { balance: ethers.BigNumber.from(balance.toString()), fetchStatus }
}

export const useGetCakeBalance = () => {
  const { balance, fetchStatus } = useTokenBalance(tokens.aat.address)

  // TODO: Remove ethers conversion once useTokenBalance is converted to ethers.BigNumber
  return { balance: ethers.BigNumber.from(balance.toString()), fetchStatus }
}

export const useGetBusdAllowance = (reload) => {
  const contract = useTokenContract(tokens.busd.address, false)
  const spender = getPresaleAddress()
  const { account } = useWeb3React()
  
  const [ isApproved, setIsApproved ] = useState(false)

  useEffect(() => {
    const fetchAlloance = async () => {
      try {
        const _allowance = await contract.allowance(account, spender)
        console.log("sniper: allowance: ", _allowance.toString())
        const allowance = Number(ethers.utils.formatEther(_allowance.toString()))
        if(allowance > 10000000) {
          setIsApproved(true)
        } else {
          setIsApproved(false)
        }
      } catch {
        setIsApproved(false)
      }
    }

    if (account && contract) {
      fetchAlloance()
    }
  }, [account, contract, spender, reload])

  return isApproved
}



export default useTokenBalance
