import { useCallback } from 'react'
import { claimPresale } from 'utils/calls'
import { usePresale } from 'hooks/useContract'

const useClaim = () => {
  const presaleContract = usePresale()

  const handleClaim = useCallback(
    async () => {
      const txHash = await claimPresale(presaleContract)
      console.info(txHash)
    },
    [presaleContract],
  )

  return { onClaim: handleClaim }
}

export default useClaim
