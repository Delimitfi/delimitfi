import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Flex, Text, Button, Modal, LinkExternal, CalculateIcon, IconButton } from '@pancakeswap/uikit'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import { ModalActions, ModalInput } from 'components/Modal'
import RoiCalculatorModal from 'components/RoiCalculatorModal'
import { useTranslation } from 'contexts/Localization'
import { FetchStatus, useGetBnbBalance, useGetBusdAllowance, useGetBusdBalance } from 'hooks/useTokenBalance'
import { getFullDisplayBalance, formatNumber, formatBigNumber } from 'utils/formatBalance'
import useToast from 'hooks/useToast'
import useTokenAllowance from 'hooks/useTokenAllowance'

interface ContributeModalProps {
  onConfirm: (amount: string) => Promise<boolean>
  onDismiss?: () => void
  tokenName?: string
}

const ContributeModal: React.FC<ContributeModalProps> = ({
  onConfirm,
  onDismiss,
  tokenName = '',
}) => {
  const [val, setVal] = useState('')
  const { toastSuccess, toastError } = useToast()
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const { balance, fetchStatus } = useGetBusdBalance()
  const fullBalance = useMemo(() => {
    if (fetchStatus === FetchStatus.SUCCESS) {
      return getFullDisplayBalance(new BigNumber(formatBigNumber(balance)).times(DEFAULT_TOKEN_DECIMAL))
    }
    return getFullDisplayBalance(new BigNumber(0))
  }, [balance, fetchStatus])

  const lpTokensToStake = new BigNumber(val)
  const fullBalanceNumber = new BigNumber(fullBalance)

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal title={t(`Contribute ${tokenName}`)} onDismiss={onDismiss}>
       <ModalInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      /> 
      <ModalActions>
        <Button variant="secondary" onClick={onDismiss} width="100%" disabled={pendingTx}>
          {t('Cancel')}
        </Button>
        <Button
          width="100%"
          disabled={
            pendingTx || !lpTokensToStake.isFinite() || lpTokensToStake.eq(0) || lpTokensToStake.gt(fullBalanceNumber)
          }
          onClick={async () => {
            setPendingTx(true)
            try {
              const res = await onConfirm(val)
              if(res) {
                toastSuccess(t('Success!'), t('Your funds have been contributed in the pre-sale'))
                onDismiss()
              }
            } catch (e) {
              toastError(
                t('Error'),
                t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
              )
              console.error(e)
            } finally {
              setPendingTx(false)
            }
          }}
        >
          {pendingTx ? t('Confirming') : t('Confirm')}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default ContributeModal
