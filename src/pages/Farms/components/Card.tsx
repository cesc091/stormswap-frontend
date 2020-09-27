import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
  background: ${props => props.theme.bg3};

  border-radius: 12px;
  box-shadow: inset 1px 1px 0px ${props => props.theme.bg2};
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default Card
