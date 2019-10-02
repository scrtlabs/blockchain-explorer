import React from 'react'
import styled from 'styled-components'
import Icon from './img/icon.svg'

const NetworkWrapper = styled.div`
  align-items: center;
  display: flex;
`

const IconStyled = styled.img`
  height: 13px;
  margin: 0 10px 0 0;
  width: 13px;
`

const NetworkName = styled.span`
  color: ${props => props.theme.header.color};
  font-size: 14px;
  font-weight: normal;
  line-height: 1.2;
  text-align: left;
`

const Network = (props: { network: string }) => {
  const { network, ...restProps } = props

  return (
    <NetworkWrapper {...restProps}>
      <IconStyled src={Icon} alt="" />
      <NetworkName>{network}</NetworkName>
    </NetworkWrapper>
  )
}

export default Network
