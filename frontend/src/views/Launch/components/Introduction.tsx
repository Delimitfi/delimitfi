import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

const IntroductionWrapper = styled(Card)`
  min-height: 880px;
  margin: 0 auto;
  padding: 2px;
`
const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 40px;

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }
`

const Introduction: React.FC = () => {
  const { t } = useTranslation()

  return (
    <IntroductionWrapper>
      <CardBody>
        <div>
          <Heading as="h1" scale="xl" color="text" mb="24px">{t('How to take part')}<br /><a style={{fontSize: '18px', color: '#2f2f93'}} href='https://youtu.be/5N8BuPyz6mI' target='_blank' rel="noreferrer">{t('Please watch this short explainer video')}</a></Heading>
          <Heading mb="10px">{t('Before Pre-Sale')}:</Heading>
          <List>
            <li>
              {t('Buy BUSD, be sure to have it ready in your Web-3 wallet in BSC network.')}
            </li>
            <li>
              {t('Make sure to have a small amount of BNB to cover the transaction fees.')}
            </li>
            
            <li>{t('Open the Presale link in your Browser.')}</li>
            <li>{t('if using metamask on your phone, open the URL from within metamask browser.')}</li>
            <li>{t('Wait for the Presale to start.')}</li>
          </List>
          <Heading mb="10px">{t('During Pre-Sale')}:</Heading>
          <List>
            <li>
              {t('While the sale is live, press the Buy button and input the amount of BUSD')}
            </li>
            <li>{t('Confirm the amount of BUSD you want to invest')}</li>
            <li>{t('Min amount 10 BUSD')}</li>
            <li>{t('Max Amount 1000 BUSD')}</li>
          </List>
          <Heading mb="10px">{t('After SoftCap is reached')}:</Heading>
          <List>
            <li>{t('10 Billion DLM will be distributed to wallets who joined the presale.')}</li>
          </List>
          {/* <Heading mb="10px">{t('After HardCap is reached')}:</Heading>
          <List>
            <li>{t('15 Billion DLM will be distributed to wallets who joined the presale.')}</li>
          </List> */}
          <Heading mb="10px">{t('After Pre-Sale')}:</Heading>
          <List>
            <li>{t('Token will be vested until 1th Feb 2023')}</li>
          </List>
          <Heading mb="10px">{t('Refund')}:</Heading>
          <List>
            <li>{t('If soft cap is not met then BUSD is refunded to buyers\' wallets')}</li>
          </List>
        </div>
      </CardBody>
    </IntroductionWrapper>
  )
}

export default Introduction