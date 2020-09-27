import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import bfx from '../../../assets/svg/BFX.svg'

import Button from '../../../components/FarmButton'
import Card from './Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useModal from '../../../hooks/useModal'
import useBifrost from '../../../hooks/useBifrost'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useSushi from '../../../hooks/useSushi'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { getSushiAddress } from '../../../sushi/utils'
import DepositModal from './DepositModal'

const Stake: React.FC = () => {
  const [requestedApproval, setRequestedApproval] = useState(false)

  const storm = useSushi()
  const stormAddress = getSushiAddress(storm)

  const { bfxBalance, handleEnterBifrost, handleApproveBifrost, allowance, isOpen } = useBifrost()
  const stormBalance = useTokenBalance(stormAddress)

  const [onPresentDeposit] = useModal(
    <DepositModal max={stormBalance} onConfirm={handleEnterBifrost} tokenName="STORM" />
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await handleApproveBifrost()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {}
  }, [handleApproveBifrost, setRequestedApproval])

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <StyledIcon src={bfx} alt="farm icon" />
            </CardIcon>
            <Value value={getBalanceNumber(bfxBalance)} />
            <Label text="BFX Balance" />
          </StyledCardHeader>
          <StyledCardActions>
            {!allowance.toNumber() ? (
              <Button
                disabled={requestedApproval || !isOpen}
                onClick={handleApprove}
                text={isOpen ? 'Approve STORM' : 'Bifrost Closed'}
              />
            ) : (
              <>
                <Button
                  disabled={stormBalance.eq(new BigNumber(0)) || !isOpen}
                  text={isOpen ? 'Convert to BFX' : 'Bifrost Closed'}
                  onClick={onPresentDeposit}
                />
              </>
            )}
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

const StyledIcon = styled.img`
  height: 3rem;
  width: 2rem;
`

export default Stake
