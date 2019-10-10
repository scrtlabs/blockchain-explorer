import React from 'react'
import styled from 'styled-components'
import Card from '../Common/Card'

const NetworkInfoCardStyled = styled(Card)`
  min-width: 244px;
`

const Item = styled.div`
  margin: 0 0 12px 0;

  &:last-child {
    margin-bottom: 0;
  }
`

const Title = styled.h2`
  color: ${props => props.theme.colors.textLight};
  font-size: 13px;
  font-weight: normal;
  line-height: 1.38;
  margin: 0;
`

const Value = styled.p`
  color: ${props => props.theme.colors.textCommon};
  font-size: 22px;
  font-weight: normal;
  line-height: 1.09;
  margin: 0;
`

const Code = styled.span`
  font-size: 18px;
`

const info = [
  {
    title: 'ENG Price',
    value: '111,111.111',
    code: 'USD',
  },
  {
    title: 'Market Cap',
    value: '9,999,999',
    code: 'USD',
  },
  {
    title: 'Unique Users',
    value: '9888777',
  },
  {
    title: 'Workers',
    value: '9999999',
  },
  {
    title: 'Staked ENG',
    value: '3333333',
  },
]

const NetworkInfoCard = ({ ...restProps }) => {
  return (
    <NetworkInfoCardStyled {...restProps}>
      {info.map((item, index) => {
        return (
          <Item key={index}>
            <Title>{item.title}</Title>
            <Value>
              {item.value} {item.code ? <Code>{item.code}</Code> : null}
            </Value>
          </Item>
        )
      })}
    </NetworkInfoCardStyled>
  )
}

export default NetworkInfoCard
