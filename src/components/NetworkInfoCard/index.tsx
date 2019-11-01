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
    }
  }
`

const WORKERS_BALANCE_QUERY = gql`
  subscription WorkersBalance {
    workers {
      balance
    }
  }
`

const USERS_PER_EPOCH_QUERY = gql`
  subscription UsersPerEpoch($total: Int, $skip: Int) {
    epoches(total: $total, skip: $skip, orderBy: order, orderDirection: desc) {
      users
    }
  }
`

const USERS_PER_EPOCH_INITIAL_VALUES = {
  total: 1000,
  skip: 0,
}

const NetworkInfoCard = ({ ...restProps }) => {
  const { data: users, error: usersError } = useSubscription(USERS_PER_EPOCH_QUERY, {
    variables: USERS_PER_EPOCH_INITIAL_VALUES,
  })
  const { data: workers, error: workersError } = useSubscription(WORKERS_BALANCE_QUERY)
  const { data: state, error: stateError } = useSubscription(ENIGMA_STATE_QUERY)
  const [stats, setStats] = React.useState({
    marketCap: '0',
    price: '0',
    users: '0',
    workers: '0',
    stake: '0',
  })

  if (usersError) console.error(usersError.message)
  if (workersError) console.error(workersError.message)
  if (stateError) console.error(stateError.message)

  React.useMemo(() => {
    const partialStats = {
      users: stats.users,
      workers: stats.workers,
      stake: stats.stake,
    }

    if (users && users.epoches) {
      partialStats.users = `${
        Array.from(new Set(users.epoches.map((epoch: any) => epoch.users).flat())).filter((user: any) => user).length
      }`
    }

    if (workers && workers.workers) {
      partialStats.stake = `${workers.workers.reduce((acc: number, worker: any) => acc + +worker.balance, 0)}`
    }

    if (state && state.enigmaState) {
      partialStats.workers = state.enigmaState.workerCount
    }

    setStats(prev => ({ ...prev, ...partialStats }))
  }, [users, workers, state])

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
