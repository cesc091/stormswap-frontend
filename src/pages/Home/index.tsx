import React, { useCallback } from 'react'
import styled from 'styled-components'

import logo from '../../assets/images/logobig.png'
import wordmark from '../../assets/images/wordmarkbig.png'
import Button from '../../components/FarmButton'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'

import Spacer from '../../components/Spacer'
import Balances from './components/Balances'

import { useActiveWeb3React } from '../../hooks'

const Home: React.FC = () => {
  const { account } = useActiveWeb3React()

  const handleClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(
      `StormSwap is a new modern AMM that is bringing complete DeFi infrastructure to Binance SmartChain. Earn STORM tokens through liquidity mining using my link at https://app.stormswap.io/#home?ref=${account} and get a 5% bonus every harvest!`
    )
    alert('Copied to Clipboard')
  }, [account])

  return (
    <Page>
      <PageHeader icon={logo} wordmark={wordmark} subtitle="Stake your StormSwap LP tokens to earn STORM" />

      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      <StyledInfo>STORM-BNB LP token pool yields 5x more tokens rewards per block</StyledInfo>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto'
        }}
      >
        <Button text="Earn STORM" to="/earn" variant="secondary" />
        <Ref>
          <Button text="Copy your Ref Link" variant="secondary" onClick={handleClipboard} />
        </Ref>
      </div>
    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${props => props.theme.text1};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${props => props.theme.text1};
  }
`

const Ref = styled.div`
  margin-top: 15px;
`

export default Home
