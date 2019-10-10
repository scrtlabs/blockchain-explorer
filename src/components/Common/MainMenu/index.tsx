import React from 'react'
import styled from 'styled-components'
import { withRouter, NavLink } from 'react-router-dom'

const MainMenuWrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;

  @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
    background-color: transparent;
    box-shadow: none;
    flex-direction: row;
  }
`

const Item = styled(NavLink)`
  align-items: center;
  border-bottom: 4px solid transparent;
  color: #000;
  display: flex;
  font-size: 15px;
  font-weight: 400;
  height: 45px;
  justify-content: center;
  margin: 0;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;

  &:active,
  &.active {
    background-color: ${props => props.theme.colors.primary};
    color: #fff;
    font-weight: 600;
  }

  &:active {
    opacity: 0.8;
  }

  @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
    font-size: 13px;
    font-weight: 400;
    height: ${props => props.theme.header.height};
    justify-content: flex-start;
    margin: 0 0 0 25px;

    &:active,
    &.active {
      background-color: transparent;
      border-bottom-color: ${props => props.theme.colors.primary};
      color: #000;
      font-weight: 400;
    }

    &:active {
      opacity: 1;
    }
  }
`

const MainMenu: React.FC = props => (
  <MainMenuWrapper {...props}>
    <Item activeClassName="active" to={'/home'}>
      Home
    </Item>
    <Item activeClassName="active" to={'/tasks'}>
      Tasks
    </Item>
    <Item activeClassName="active" to={'/epochs'}>
      Epochs
    </Item>
    <Item activeClassName="active" to={'/workers'}>
      Workers
    </Item>
  </MainMenuWrapper>
)

export default withRouter(MainMenu)
