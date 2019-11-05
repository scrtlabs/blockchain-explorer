import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { History } from 'history'
import BaseTable from '../Common/BaseTable'
import { FlexAlign } from '../Common/EnhancedTableHead'
import HexAddr from '../Common/HexAddr'
import SectionTitle from 'components/Common/SectionTitle'
import FullLoading from '../Common/FullLoading'
import { Value } from 'components/Common/GridCell'
import SearchBar from '../Common/SearchBar'
import { Direction, GraphToField, FieldToGraph, WorkerBasicData } from './types'
import { WORKERS_INITIAL_VALUES, WORKERS_QUERY, WORKERS_BY_ID_QUERY } from './queries'
import { DocumentNode } from 'graphql'

interface WorkerIdProps {
  onClick: () => void
  id: string
}
const WorkerId: React.FC<WorkerIdProps> = ({ id, onClick }) => (
  <Value underline={true} onClick={onClick}>
    <HexAddr start={8} end={8}>
      {id}
    </HexAddr>
  </Value>
)

const HEADER_CELLS = [
  { id: 'workerAddress', useClassShowOnDesktop: false, sortable: true, align: FlexAlign.start, label: 'Address' },
  {
    id: 'workerStackedEng',
    useClassShowOnDesktop: false,
    sortable: true,
    align: FlexAlign.end,
    label: 'Staked ENG',
  },
  {
    id: 'workerActiveVsTotal',
    useClassShowOnDesktop: true,
    sortable: false,
    align: FlexAlign.center,
    label: 'Epochs Active / Total Epochs',
  },
  {
    id: 'workerCompletedTasks',
    useClassShowOnDesktop: true,
    sortable: false,
    align: FlexAlign.end,
    label: '% Of Completed Tasks',
  },
  {
    id: 'workerEngReward',
    useClassShowOnDesktop: false,
    sortable: true,
    align: FlexAlign.end,
    label: 'ENG Reward',
  },
]

interface WorkersProps {
  history: History
  query: DocumentNode
  queryVariables: any
}

const WorkersWrapper: React.FC<any> = ({ history }) => {
  const [workerParams, setWorkerParams] = React.useState({
    query: WORKERS_QUERY,
    queryVariables: WORKERS_INITIAL_VALUES,
  })

  const handleRequestSearch = async (event: React.SyntheticEvent<React.FormEvent>, id: any) => {
    event.preventDefault()
    event.stopPropagation()

    if (!id) return

    setWorkerParams({ query: WORKERS_BY_ID_QUERY, queryVariables: { ...WORKERS_INITIAL_VALUES, id } })
  }

  const handleClearSearch = () => {
    setWorkerParams({ query: WORKERS_QUERY, queryVariables: WORKERS_INITIAL_VALUES })
  }

  const right = (
    <SearchBar
      placeholder="Search by Worker address..."
      onRequestSearch={handleRequestSearch}
      onClearSearch={handleClearSearch}
    />
  )

  return (
    <>
      <SectionTitle right={right}>Workers</SectionTitle>
      <Workers {...workerParams} history={history} />
    </>
  )
}

const Workers: React.FC<WorkersProps> = ({ history, query, queryVariables }) => {
  const { data, error, loading, variables, refetch } = useQuery(query, { variables: queryVariables })
  const { total, skip, orderBy, orderDirection } = variables

  if (error) console.error(error.message)

  const handleRequestSort = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    sortField: keyof typeof FieldToGraph,
  ) => {
    refetch({
      ...WORKERS_INITIAL_VALUES,
      total,
      orderBy: FieldToGraph[sortField] === orderBy ? orderBy : FieldToGraph[sortField],
      orderDirection: orderDirection === Direction.descending ? Direction.ascending : Direction.descending,
    })
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    refetch({ ...variables, skip: page * total })
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    refetch({ ...variables, total: +event.target.value, skip: WORKERS_INITIAL_VALUES.skip })
  }

  const goToWorkerDetails = (workerId: string) => {
    history.push(`/worker/${workerId}`)
  }

  const extractWorkerData = (worker: WorkerBasicData, index: number) => {
    const totalEpochs = +data.enigmaState.latestEpoch.id + 1
    const totalTasks = +worker.completedTaskCount + +worker.failedTaskCount

    const id = {
      align: HEADER_CELLS[0].align,
      useClassShowOnDesktop: false,
      id: `${worker.id}_${worker.id}`,
      value: <WorkerId id={worker.id} onClick={() => goToWorkerDetails(worker.id)} />,
    }
    const balance = {
      align: HEADER_CELLS[1].align,
      useClassShowOnDesktop: false,
      id: `${worker.id}_${worker.balance}`,
      value: worker.balance,
    }
    const epochCount = {
      align: HEADER_CELLS[2].align,
      useClassShowOnDesktop: true,
      id: `${worker.id}_${worker.epochCount}_${totalEpochs}`,
      value: `${worker.epochCount} of ${totalEpochs}`,
    }
    const percentage = {
      align: HEADER_CELLS[3].align,
      useClassShowOnDesktop: true,
      id: `${worker.id}_${worker.completedTaskCount + worker.failedTaskCount}_t_${index}`,
      value: `${totalTasks ? Math.floor(+(+worker.completedTaskCount / totalTasks).toFixed(2) * 100) : 0}%`,
    }
    const reward = {
      align: HEADER_CELLS[4].align,
      useClassShowOnDesktop: false,
      id: `${worker.id}_${worker.reward}`,
      value: worker.reward || '-',
    }

    return {
      id: worker.id,
      cells: [id, balance, epochCount, percentage, reward],
    }
  }

  return (
    <>
      <BaseTable
        headerProps={{
          headerCells: HEADER_CELLS,
          order: orderDirection,
          orderBy: GraphToField[orderBy as keyof typeof GraphToField],
          onRequestSort: handleRequestSort,
        }}
        rows={data && data.workers && data.workers.map(extractWorkerData)}
        paginatorProps={{
          colSpan: HEADER_CELLS.length,
          count: data ? +data.enigmaState.workerCount : 0,
          onChangePage: handleChangePage,
          onChangeRowsPerPage: handleChangeRowsPerPage,
          page: Math.floor(skip / total),
          rowsPerPage: total,
        }}
      />
      {loading && !data && <FullLoading />}
    </>
  )
}

export default WorkersWrapper
