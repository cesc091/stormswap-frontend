import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
  background: ${props => props.theme.bg1};
  border-radius: 12px;
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default Card
