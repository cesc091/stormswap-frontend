import React from 'react'
import styled, { css } from 'styled-components'

interface CardIconProps {
  children?: React.ReactNode
  isBfx?: boolean
}

const CardIcon: React.FC<CardIconProps> = ({ children, isBfx }) => (
  //@ts-ignore
  <StyledCardIcon isBfx={isBfx}>{children}</StyledCardIcon>
)

const StyledCardIcon = styled.div`
  background-color: ${props => props.theme.bg1};
  font-size: 36px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  align-items: center;
  display: flex;
  justify-content: center;

  margin: 0 auto ${props => props.theme.spacing[3]}px;

  ${props =>
    //@ts-ignore
    (props.isBfx as any) &&
    css`
      img {
        width: 32px;
        height: 32px;
      }
    `}
`

export default CardIcon
