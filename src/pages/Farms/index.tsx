import React from 'react'
import styled from 'styled-components'

import logo from '../../assets/images/logobig.png'
import wordmark from '../../assets/images/wordmarkbig.png'

import { useActiveWeb3React } from '../../hooks'

import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'

import FarmCards from './components/FarmCards'

const Farms: React.FC = () => {
  const { account } = useActiveWeb3React()

  return (
    <Page>
      {!!account ? (
        <>
          <PageHeader icon={logo} wordmark={wordmark} subtitle="Stake your StormSwap LP tokens to earn STORM" />

          <FarmCards />
        </>
      ) : (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <Text>Connect to your wallet</Text>
        </div>
      )}
    </Page>
  )
}

const Text = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  font-size: 1.5rem;
  width: fit-content;
`

export default Farms
