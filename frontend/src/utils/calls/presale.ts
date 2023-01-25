import { ethers } from 'ethers'
import { DEFAULT_GAS_LIMIT } from 'config'
import getGasPrice from 'utils/getGasPrice'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const contributePresale = async (presaleContract, amount) => {
  const gasPrice = getGasPrice()
  const tx = await presaleContract.buyTokens(ethers.utils.parseEther(amount), { ...options, gasPrice })
  const receipt = await tx.wait()
}

export const claimPresale = async (presaleContract) => {
  const gasPrice = getGasPrice()
  const tx = await presaleContract.claimTokens({ ...options, gasPrice })
  const receipt = await tx.wait()
}

export const refundPresale = async (presaleContract) => {
  const gasPrice = getGasPrice()
  const tx = await presaleContract.refund({ ...options, gasPrice })
  const receipt = await tx.wait()
}

export const approveBusd = async (busdContract, spender, amount) => {
  const gasPrice = getGasPrice()
  const tx = await busdContract.approve(spender, amount, { ...options, gasPrice })
  const receipt = await tx.wait()
}
