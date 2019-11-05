import React from 'react'
import styled from 'styled-components'
import Card from '../Common/Card'
import { useSubscription } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { coinMarketCap } from '../../utils/api'

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

const INFO = [
  {
    title: 'ENG Price',
    key: 'price',
    code: 'USD',
  },
  {
    title: 'Market Cap',
    key: 'marketCap',
    code: 'USD',
  },
  {
    title: 'Unique Users',
    key: 'users',
  },
  {
    title: 'Workers',
    key: 'workers',
  },
  {
    title: 'Staked ENG',
    key: 'stake',
  },
]

const ENIGMA_STATE_QUERY = gql`
  subscription EnigmaState {
    enigmaState(id: 0) {
      workerCount
      userCount
      staked
    }
  }
`

const NetworkInfoCard = ({ ...restProps }) => {
  const { data, error } = useSubscription(ENIGMA_STATE_QUERY)
  const [stats, setStats] = React.useState({
    marketCap: '0',
    price: '0',
    users: '0',
    workers: '0',
    stake: '0',
  })

  if (error) console.error(error.message)

  React.useMemo(() => {
    const partialStats = {
      users: stats.users,
      workers: stats.workers,
      stake: stats.stake,
    }

    if (data && data.enigmaState) {
      partialStats.users = data.enigmaState.userCount
      partialStats.workers = data.enigmaState.workerCount
      partialStats.stake = data.enigmaState.staked
    }

    setStats(prev => ({ ...prev, ...partialStats }))
  }, [data, stats.users, stats.workers, stats.stake])

  React.useEffect(() => {
    const retrieveMarketStats = async () => {
      const { price, marketCap } = await coinMarketCap()
      setStats(prev => ({ ...prev, price, marketCap }))
    }

    retrieveMarketStats()
  }, [])

  return (
    <NetworkInfoCardStyled {...restProps}>
      {INFO.map(item => {
        return (
          <Item key={item.key}>
            <Title>{item.title}</Title>
            <Value>
              {stats[item.key as keyof typeof stats]} {item.code && <Code>{item.code}</Code>}
            </Value>
          </Item>
        )
      })}
    </NetworkInfoCardStyled>
  )
}

export default NetworkInfoCard
