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
import FullLoading from '../Common/FullLoading'
import { EpochBasicData } from '../Epochs/types'

const DetailsCard = styled(Card)`
  margin-bottom: 35px;

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
  query WorkerById($workerId: String) {
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
        selectedWorkers @client
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
  const totalTasks = +worker.completedTaskCount + +worker.failedTaskCount
  const { epoches = [], selected = 0 } =
    worker &&
    worker.epochs
      .map((e: EpochBasicData) => ({ id: e.order, workers: e.selectedWorkers }))
      .reduce(
        (acc: any, e: { id: string; workers: string[] }) => {
          if (e.workers.indexOf(workerAddress) !== -1) {
            acc.selected += 1
            acc.epoches.push(e.id)
          }
          return acc
        },
        { epoches: [], selected: 0 },
      )

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
        <GridCell title="Epochs Selected" value={`${selected} / ${totalEpochs}`} />
      </DetailsCard>
      <Epochs title="Selected Epochs" workerId={workerAddress} epoches={epoches} />
      {loading && !data && <FullLoading />}
    </>
  )
}

export default Worker
