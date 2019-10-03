import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../Logo'
import Network from '../Network'
import MainMenu from '../MainMenu'
import MobileMenu from '../MobileMenu'
import styled, { css } from 'styled-components'
import getNetworkDetailsBy from '../../../utils/networks'

const HeaderWrapper = styled.div`
  background: ${props => props.theme.header.backgroundColor};
  box-shadow: ${props => props.theme.header.boxShadow};
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  height: ${props => props.theme.header.height};
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 5;
`

const HeaderInner = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 10px;
  width: ${props => props.theme.themeBreakPoints.xxl};

  @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
    padding: 0 ${props => props.theme.paddings.mainPadding};
  }
`

const Separator = css`
  &::before {
    background-color: #000;
    content: '';
    height: 22px;
    margin: 0 15px 0 0;
    width: 1px;
  }
`

const NetworkStyled = styled(Network)`
  ${Separator}
  margin-left: 15px;
`

const MobileMenuStyled = styled(MobileMenu)`
  display: inherit;
  margin: 0 0 0 auto;

  @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
    display: none;
  }
`

const MainMenuStyled = styled(MainMenu)`
  display: none;
  margin-left: auto;

  @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
    display: inherit;
  }
`

const Header: React.FC = props => {
  const { label: network } = getNetworkDetailsBy('id')(process.env.REACT_APP_ETH_NETWORK_ID)

  const [isMenuOpen, setMenuState] = useState(false)

  const toggleMenu = () => setMenuState(!isMenuOpen)

  return (
    <HeaderWrapper {...props}>
      <HeaderInner>
        <NavLink to="/">
          <Logo />
        </NavLink>
        <NetworkStyled network={network} />
        <MainMenuStyled />
        <MobileMenuStyled toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      </HeaderInner>
    </HeaderWrapper>
  )
}

export default Header
