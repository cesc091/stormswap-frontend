import BigNumber from 'bignumber.js'
import React from 'react'

import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'

import Button from '../../../components/FarmButton'
import Card from './Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/FarmLoader'
import Spacer from '../../../components/Spacer'
import { Farm } from '../../../contexts/Farms'

import useAllStakedValue, { StakedValue } from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'

interface FarmWithStakedValue extends Farm, StakedValue {
  apy: BigNumber | null
}

const FarmCards: React.FC = () => {
  const [farms] = useFarms()

  const stakedValue = useAllStakedValue()

  const sushiIndex = farms.findIndex(({ tokenSymbol }) => tokenSymbol === 'STORM')

  const sushiPrice =
    sushiIndex >= 0 && stakedValue[sushiIndex] ? stakedValue[sushiIndex].tokenPriceInWeth : new BigNumber(0)

  const BLOCKS_PER_YEAR = new BigNumber(10368000)
  const SUSHI_PER_BLOCK = new BigNumber(0.25)

  const rows = farms.reduce<FarmWithStakedValue[][]>(
    (farmRows, farm, i) => {
      const farmWithStakedValue = {
        ...farm,
        ...stakedValue[i],
        apy: stakedValue[i]
          ? sushiPrice
              .times(SUSHI_PER_BLOCK)
              .times(BLOCKS_PER_YEAR)
              .times(stakedValue[i].poolWeight)
              .div(stakedValue[i].totalWethValue)
          : null
      }
      const newFarmRows = [...farmRows]
      if (newFarmRows[newFarmRows.length - 1].length === 3) {
        newFarmRows.push([farmWithStakedValue])
      } else {
        newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue)
      }
      return newFarmRows
    },
    [[]]
  )

  return (
    <StyledCards>
      {!!rows[0].length ? (
        rows.map((farmRow, i) => (
          <StyledRow key={i}>
            {farmRow.map((farm, j) => (
              <React.Fragment key={j}>
                <FarmCard farm={farm} />
                {(j === 0 || j === 1) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>
        ))
      ) : (
        <StyledLoadingWrapper>
          <Loader text="Loading ..." />
        </StyledLoadingWrapper>
      )}
    </StyledCards>
  )
}

interface FarmCardProps {
  farm: FarmWithStakedValue
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  const startTime = 1601373600

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds, days } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>
        {days} days + {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  // useEffect(() => {
  //   async function fetchEarned() {
  //     if (sushi) return
  //     const earned = await getEarned(getMasterChefContract(sushi), lpTokenAddress, account)
  //     setHarvestable(bnToDec(earned))
  //   }
  //   if (sushi && account) {
  //     fetchEarned()
  //   }
  // }, [sushi, lpTokenAddress, account, setHarvestable])

  const poolActive = startTime * 1000 - Date.now() <= 0

  return (
    <StyledCardWrapper>
      {farm.tokenSymbol === 'STORM' || farm.tokenSymbol === 'BFX' ? <StyledCardAccent /> : null}
      <Card>
        <CardContent>
          <StyledContent>
            <CardIcon isBfx={farm.tokenSymbol === 'BFX'}>
              <img src={farm.icon} alt="Icon" />
            </CardIcon>
            <StyledTitle>{farm.name}</StyledTitle>
            <StyledDetails>
              <StyledDetail>Deposit {farm.lpToken.toUpperCase()}</StyledDetail>
              <StyledDetail>Earn {farm.earnToken.toUpperCase()}</StyledDetail>
            </StyledDetails>
            <Spacer />
            <Button disabled={!poolActive} text={poolActive ? 'Select' : undefined} to={`/earn/${farm.id}`}>
              {!poolActive && <Countdown date={new Date(startTime * 1000)} renderer={renderer} />}
            </Button>
            <StyledInsight>
              <span>APY</span>
              <span>
                {farm.apy
                  ? `${farm.apy
                      .times(new BigNumber(100))
                      .toNumber()
                      .toLocaleString('en-US')
                      .slice(0, -1)}%`
                  : poolActive
                  ? 'Loading ...'
                  : 'Pool closed'}
              </span>
              {/* <span>
                {farm.tokenAmount
                  ? (farm.tokenAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                {farm.tokenSymbol}
              </span>
              <span>
                {farm.wethAmount
                  ? (farm.wethAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                ETH
              </span> */}
            </StyledInsight>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

const RainbowLight = keyframes`
  
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(45deg, #f0b90b, #c99b06, #fff);
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${props => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${props => props.theme.text1};
  font-size: 24px;
  font-weight: 700;
  margin: ${props => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  width: ${props => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-top: ${props => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${props => props.theme.text1};
`

const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  background: ${({ theme }) => theme.bg1};
  color: ${({ theme }) => theme.primary4};
  font-weight: bold;
  width: 100%;
  margin-top: 12px;
  line-height: 32px;
  font-size: 13px;
  text-align: center;
  padding: 0 12px;
`

export default FarmCards
