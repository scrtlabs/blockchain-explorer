import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import Card from '../Common/Card'
import SectionTitle from '../Common/SectionTitle'
import CopyText from '../Common/CopyText'
import GridCell, { GridCellStyled, Title, Value } from '../Common/GridCell'
import Epochs from '../Epochs'
import HexAddr from '../Common/HexAddr'
import ContainedLoading from '../Common/ContainedLoading'

const DetailsCard = styled(Card)`
  margin-bottom: 35px;
  position: relative;

  > div {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 15px;

    @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
      column-gap: 15px;
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media (min-width: ${props => props.theme.themeBreakPoints.xxl}) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    }
  }
`

const ValueStyled = styled(Value)`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`

const WORKER_BY_ID_QUERY = gql`
  query WorkerById($workerId: ID!) {
    worker(id: $workerId) {
      completedTaskCount
      failedTaskCount
      reward
      balance
      epochCount
      epochs(orderBy: order, orderDirection: asc) {
        order
        startBlockNumber
        endBlockNumber
        seed
        workers {
          id
        }
        stakes
        deployedSecretContracts
      }
    }
    enigmaState(id: 0) {
      latestEpoch {
        id
      }
    }
  }
`

const Worker = (props: any) => {
  const {
    match: {
      params: { workerAddress },
    },
  } = props
  const { data, error, loading } = useQuery(WORKER_BY_ID_QUERY, { variables: { workerId: workerAddress } })
  const worker = data ? data.worker : { completedTaskCount: 0, reward: 0, balance: 0, epochs: [] }
  const totalEpochs = +(data && data.enigmaState.latestEpoch.id) + 1 || 0
  const totalTasks = (worker && +worker.completedTaskCount + +worker.failedTaskCount) || 0
  const [epoches, setEpoches] = React.useState([])

  React.useMemo(() => {
    const updateEpoches = async () => {
      const response = await fetch(`${process.env.REACT_APP_ENIGMA_API}/workers/${workerAddress}`, { mode: 'no-cors' })

      if (response.ok) {
        setEpoches(await response.json())
      }
    }
    updateEpoches()
  }, [workerAddress])

  if (error) console.error(error.message)

  return (
    <>
      <SectionTitle>Worker</SectionTitle>
      <DetailsCard>
        <GridCellStyled>
          <Title>Address</Title>
          <ValueStyled>
            <HexAddr start={8} end={8}>
              {workerAddress}
            </HexAddr>{' '}
            <CopyText text={workerAddress} />
          </ValueStyled>
        </GridCellStyled>
        <GridCell title="Successful Tasks" value={`${worker.completedTaskCount} / ${totalTasks}`} />
        <GridCell title="ENG Rewards" value={worker.reward} />
        <GridCell title="ENG Staked" value={worker.balance} />
        <GridCell title="Epochs Active" value={`${worker.epochCount || 0} / ${totalEpochs}`} />
        <GridCell title="Epochs Selected" value={`${epoches.length} / ${totalEpochs}`} />
        {loading && <ContainedLoading />}
      </DetailsCard>
      <Epochs title="Selected Epochs" workerId={workerAddress} epoches={epoches} />
    </>
  )
}

export default Worker
