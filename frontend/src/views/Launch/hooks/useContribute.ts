import { useCallback } from 'react'
import { contributePresale } from 'utils/calls'
import { usePresale } from 'hooks/useContract'

const useContribute = () => {
  const presaleContract = usePresale()

  const handleContribute = useCallback(
    async (amount: string) => {
      const txHash = await contributePresale(presaleContract, amount)
      console.info(txHash)
    },
    [presaleContract],
  )

  return { onContribute: handleContribute }
}

export default useContribute
