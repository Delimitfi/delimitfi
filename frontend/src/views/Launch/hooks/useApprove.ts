import { useCallback } from 'react'
import { approveBusd } from 'utils/calls'
import { useERC20 } from 'hooks/useContract'
import { getBusdAddress, getPresaleAddress } from 'utils/addressHelpers'
import { ethers } from 'ethers'

const useApprove = () => {
  const busdAddress = getBusdAddress()
  const presaleAddress = getPresaleAddress()
  const busdContract = useERC20(busdAddress)

  const handleApprove = useCallback(
    async () => {
      const txHash = await approveBusd(busdContract, presaleAddress, ethers.constants.MaxUint256)
      console.info(txHash)
    },
    [busdContract, presaleAddress],
  )

  return { onApprove: handleApprove }
}

export default useApprove
