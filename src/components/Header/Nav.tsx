import React from 'react'
import styled from 'styled-components'
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom'
import { ExternalLink } from '../../theme'

const NavElement = styled.nav`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    overflow-x: auto;
    margin-bottom: 16px;
  `};
`

const activeClassName = 'ACTIVENAV'
const NavItem = styled(NavLink).attrs({
  activeClassName
})`
  color: ${({ theme }) => theme.text1};
  font-weight: bold;
  text-decoration: none;
  white-space: nowrap;
  margin-left: 40px;

  &.${activeClassName} {
    color: ${({ theme }) => theme.primary1};
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-left: 0;
    margin-right: 16px;
  `};
`
const AboutLink = styled(ExternalLink)`
  color: ${({ theme }) => theme.text1};
  font-weight: bold;
  text-decoration: none;
  margin-left: 40px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-left: 0;
    margin-right: 8px;
  `};
`

export default function Nav() {
  const location = useLocation()
  const newPags: string[] = ['/home', '/earn', '/bifrost']
  const farmMatch = useRouteMatch({
    path: '/earn/:poolId',
    strict: true,
    sensitive: true
  })
  return (
    <NavElement>
      <NavItem
        to={{
          pathname: '/home',
          search: location.search
        }}
        className={location.pathname === '/home' ? activeClassName : ''}
      >
        Home
      </NavItem>
      <NavItem
        to={{
          pathname: '/swap',
          search: location.search
        }}
        className={!newPags.includes(location.pathname) && !farmMatch ? activeClassName : ''}
      >
        Exchange
      </NavItem>
      <NavItem
        to={{
          pathname: '/earn',
          search: location.search
        }}
        className={location.pathname === '/earn' ? activeClassName : ''}
      >
        Earn
      </NavItem>
      <NavItem
        to={{
          pathname: '/bifrost',
          search: location.search
        }}
        className={location.pathname === '/bifrost' ? activeClassName : ''}
      >
        Bifrost
      </NavItem>

      <AboutLink href={'https://www.bscscan.com/'}>BscScan</AboutLink>
    </NavElement>
  )
}
