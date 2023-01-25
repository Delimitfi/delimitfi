import { launchConfig } from 'config/constants'
import multicall from 'utils/multicall'
import { getAddress, getBusdAddress } from 'utils/addressHelpers'
import { simpleRpcProvider } from 'utils/providers'
import tokens from 'config/constants/tokens'
import erc20 from 'config/abi/erc20.json'
import presale from 'config/abi/presale.json'
import { getBep20Contract } from 'utils/contractHelpers'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

// export const fetchBalance = async () => {
//   const presaleBalance = await simpleRpcProvider.getBalance(launchConfig.presaleAddress)
  
//   return presaleBalance
// }
export const fetchBalance = async () => {
  const contract = getBep20Contract(getBusdAddress())
  try {
    const res = await contract.balanceOf(launchConfig.presaleAddress)
    return Number(ethers.utils.formatEther(res.toString()))
  } catch (e) {
    console.error(e)
    return 0
  }
}

export const fetchStartTime = async () => {
  const calls = [
    {
      address: launchConfig.presaleAddress,
      name: 'startTime',
    },
  ]

  const [start] = await multicall(presale, calls)

  return start[0].toNumber()
}

export const fetchEndTime = async () => {
  const calls = [
    {
      address: launchConfig.presaleAddress,
      name: 'endTime',
    },
  ]

  const [end] = await multicall(presale, calls)
  
  return end[0].toNumber()
}

export const fetchSoftCapReached = async () => {
  const calls = [    
    {
      address: launchConfig.presaleAddress,
      name: 'softCapReached',
    },
  ]

  const [softCapReached] = await multicall(presale, calls)
  
  return softCapReached[0]
}

export const fetchFinalized = async () => {
  const calls = [
    {
      address: launchConfig.presaleAddress,
      name: 'finalized',
    },
  ]

  const [finalized] = await multicall(presale, calls)
  
  return finalized[0]
}

export const fetchContribution = async (account) => {
  const calls = [
    {
      address: launchConfig.presaleAddress,
      name: 'contributions',
      params: [account]
    },
  ]

  const [contributions] = await multicall(presale, calls)

  return Number(ethers.utils.formatEther(contributions[0].toString()))
}