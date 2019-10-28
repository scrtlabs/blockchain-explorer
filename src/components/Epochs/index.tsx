import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { History } from 'history'
import BaseTable from '../Common/BaseTable'
import { FlexAlign } from '../Common/EnhancedTableHead'
import SectionTitle from '../Common/SectionTitle'
import FullLoading from '../Common/FullLoading'
import { shortEngHumanizer } from '../../utils/humanizer'
import EpochDetailed, { EpochDetailedProps, WorkerType } from '../EpochDetailed'
import { LinkText } from '../Tasks'
import estimateCurrentEpochEnd from '../../utils/estimateCurrentEpochEnd'
import { EpochBlockTypes } from '../EpochBlockNumbers'
import ethApi from '../../utils/eth'

enum Direction {
  'ascending' = 'asc',
  'descending' = 'desc',
}

enum FieldToGraph {
  'epochId' = 'order',
  'epochAge' = 'age',
  'epochTotalTasks' = 'taskCount',
  'epochCompleteTasks' = 'completedTaskCount',
  'epochWorkers' = 'workerCount',
  'epochEngGasUsed' = 'gasUsed',
  'epochEngReward' = 'reward',
}

enum GraphToField {
  'order' = 'epochId',
  'age' = 'epochAge',
  'taskCount' = 'epochTotalTasks',
  'completedTaskCount' = 'epochCompleteTasks',
  'workerCount' = 'epochWorkers',
  'gasUsed' = 'epochEngGasUsed',
  'reward' = 'epochEngReward',
}

export interface EpochProps {
  id: string
  completeBlockNumber: string
  inclusionBlockNumber: string
  startBlockNumber: string
  endBlockNumber: string
  startTime: string
  endTime: string
  workers: WorkerType[]
  tasks: any[]
  taskCount: string
  completedTaskCount: string
  workerCount: string
  userCount: string
  gasUsed: string
  reward: string
}

interface EpochsProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  workerId?: string | null
  match?: {
    params?: {
      epochId?: string
    }
  }
  history?: History
}

export interface EpochBlocksInfoProps {
  value: string | number
  title: string
  type: EpochBlockTypes
}

const epochesDetailsFragment = gql`
  fragment EpochsDetails on Epoch {
    id
    startTime
    endTime
    startBlockNumber
    endBlockNumber
    workerCount
    completedTaskCount
    taskCount
    userCount
    failedTaskCount
    gasUsed
    reward
  }
`

const latestEpochFragment = gql`
  fragment LatestEpoch on EnigmaState {
    latestEpoch {
      id
    }
  }
`

export const EPOCHS_QUERY = gql`
  query Epoches($total: Int, $skip: Int, $orderBy: String, $orderDirection: String) {
    epoches(first: $total, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...EpochsDetails
    }
    enigmaState(id: 0) {
      ...LatestEpoch
    }
  }
  ${epochesDetailsFragment}
  ${latestEpochFragment}
`

export const EPOCHS_BY_ID_QUERY = gql`
  query Epoch($epochId: String) {
    epoch(id: $epochId) {
      ...EpochsDetails
    }
    enigmaState(id: 0) {
      ...LatestEpoch
    }
  }
  ${epochesDetailsFragment}
  ${latestEpochFragment}
`

export const EPOCHS_BY_WORKER_QUERY = gql`
  query EpochesByWorker($total: Int, $skip: Int, $orderBy: String, $orderDirection: String, $workerId: String) {
    worker(id: $workerId) {
      epochs(first: $total, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
        ...EpochsDetails
      }
      epochCount
    }
    enigmaState(id: 0) {
      ...LatestEpoch
    }
  }
  ${epochesDetailsFragment}
  ${latestEpochFragment}
`

const HEADER_CELLS = [
  { id: 'epochId', useClassShowOnDesktop: false, sortable: true, align: FlexAlign.flexEnd, label: 'Number' },
  { id: 'epochAge', useClassShowOnDesktop: false, sortable: false, align: FlexAlign.center, label: 'Age' },
  {
    id: 'epochTotalTasks',
    useClassShowOnDesktop: false,
    sortable: true,
    align: FlexAlign.flexEnd,
    label: 'Number Of Tasks',
  },
  {
    id: 'epochCompleteTasks',
    useClassShowOnDesktop: true,
    sortable: false,
    align: FlexAlign.flexEnd,
    label: '% Of Completed Tasks',
  },
  {
    id: 'epochWorkers',
    useClassShowOnDesktop: true,
    sortable: true,
    align: FlexAlign.flexEnd,
    label: 'Number Of Selected Workers',
  },
  {
    id: 'epochEngGasUsed',
    useClassShowOnDesktop: true,
    sortable: true,
    align: FlexAlign.flexEnd,
    label: 'ENG Gas Used',
  },
  { id: 'epochEngReward', useClassShowOnDesktop: false, sortable: true, align: FlexAlign.flexEnd, label: 'ENG Reward' },
]

export const EPOCHS_INITIAL_VALUES = {
  total: 10,
  skip: 0,
  orderBy: FieldToGraph.epochId,
  orderDirection: Direction.descending,
}

const calculateProgress = (epoch: EpochProps) =>
  +epoch.taskCount === 0 ? null : `${+(+epoch.completedTaskCount / +epoch.taskCount).toFixed(2) * 100}`

const Epochs: React.FC<EpochsProps> = ({ title = 'Epochs', workerId = null, match, history }: EpochsProps) => {
  const epochId = match && match.params && match.params.epochId
  const query = workerId ? EPOCHS_BY_WORKER_QUERY : epochId ? EPOCHS_BY_ID_QUERY : EPOCHS_QUERY
  const queryVariables = workerId || epochId ? { ...EPOCHS_INITIAL_VALUES, workerId, epochId } : EPOCHS_INITIAL_VALUES

  const { data, error, loading, variables, refetch } = useQuery(query, { variables: queryVariables })
  const { total, skip, orderBy, orderDirection } = variables

  if (error) console.error(error.message)

  const handleRequestSort = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    sortField: keyof typeof FieldToGraph,
  ) => {
    refetch({
      total,
      skip: EPOCHS_INITIAL_VALUES.skip,
      orderBy: FieldToGraph[sortField] === orderBy ? orderBy : FieldToGraph[sortField],
      orderDirection: orderDirection === Direction.descending ? Direction.ascending : Direction.descending,
    })
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    refetch({ ...variables, skip: page * total })
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    refetch({ ...variables, total: +event.target.value, skip: EPOCHS_INITIAL_VALUES.skip })
  }

  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const [modalProps, setModalProps] = React.useState<EpochDetailedProps | {}>({})

  const closeModal = () => {
    setModalIsOpen(false)

    if (epochId && history) {
      history.replace(`/epochs`)
    }
  }

  const openModal = async (epoch: EpochProps) => {
    const progress = calculateProgress(epoch)
    const isCurrent: boolean = epoch.id === data.enigmaState.latestEpoch.id
    const currentEpochEstimates = estimateCurrentEpochEnd(data.epoches)
    const currentBlockNumber = await ethApi.getBlockNumber()

    const blocks: EpochBlocksInfoProps[] = [
      { value: epoch.startBlockNumber, title: 'First Block', type: EpochBlockTypes.first },
    ]

    if (isCurrent) {
      const { finishBlockNumber = undefined } = await currentEpochEstimates
      const value = finishBlockNumber && finishBlockNumber > currentBlockNumber ? finishBlockNumber : currentBlockNumber
      blocks.push({ value: currentBlockNumber, title: 'Current Block', type: EpochBlockTypes.current })
      blocks.push({ value, title: 'Last Block', type: EpochBlockTypes.last })
    } else {
      blocks.push({ value: epoch.endBlockNumber, title: 'Last Block', type: EpochBlockTypes.last })
    }

    const { pendingTime = undefined } = await currentEpochEstimates
    setModalProps({ epoch: { ...epoch }, isCurrent, progress, pendingTime, blocks })
    setModalIsOpen(true)
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const extractEpochData = (epoch, index) => {
    const isCurrent: boolean = epoch.id === data.enigmaState.latestEpoch.id
    const age = isCurrent ? 'current' : shortEngHumanizer(Date.now() - +epoch.endTime * 1000)
    const progress = calculateProgress(epoch)

    return {
      id: epoch.id,
      cells: [
        {
          align: FlexAlign.flexEnd,
          useClassShowOnDesktop: false,
          id: `${epoch.id}_${epoch.id}`,
          value: (
            <LinkText underline={true} onClick={() => openModal(epoch)}>
              {epoch.id}
            </LinkText>
          ),
        },
        { align: FlexAlign.flexEnd, useClassShowOnDesktop: false, id: `${epoch.id}_${age}_age`, value: age },
        {
          align: FlexAlign.flexEnd,
          useClassShowOnDesktop: false,
          id: `${epoch.id}_${epoch.taskCount}_tasks_${index}`,
          value: epoch.taskCount,
        },
        {
          align: FlexAlign.flexEnd,
          useClassShowOnDesktop: true,
          id: `${epoch.id}_${epoch.completedTaskCount + epoch.taskCount + epoch.failedTaskCount}_${index}`,
          value: progress === null ? '-' : `${progress}%`,
        },
        {
          align: FlexAlign.flexEnd,
          useClassShowOnDesktop: true,
          id: `${epoch.id}_${epoch.workerCount}_w_${index}`,
          value: epoch.workerCount || '-',
        },
        {
          align: FlexAlign.flexEnd,
          useClassShowOnDesktop: true,
          id: `${epoch.id}_${epoch.gasUsed}_gu_${index}`,
          value: epoch.gasUsed || '-',
        },
        {
          align: FlexAlign.flexEnd,
          useClassShowOnDesktop: false,
          id: `${epoch.id}_${epoch.reward}_rw_${index}`,
          value: '-',
        },
      ],
    }
  }

  React.useMemo(() => {
    if (data && data.epoch) {
      openModal(data.epoch)
    }
  }, [data && data.epoch && data.epoch.id])

  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      <BaseTable
        headerProps={{
          headerCells: HEADER_CELLS,
          order: orderDirection,
          orderBy: GraphToField[orderBy as keyof typeof GraphToField],
          onRequestSort: handleRequestSort,
        }}
        rows={
          (data && data.epoch && [data.epoch].map(extractEpochData)) ||
          (data && data.epoches && data.epoches.map(extractEpochData)) ||
          (data && data.worker && data.worker.epochs && data.worker.epochs.map(extractEpochData))
        }
        paginatorProps={{
          colSpan: HEADER_CELLS.length,
          count:
            data && data.epoches
              ? +data.enigmaState.latestEpoch.id + 1
              : data && data.worker
              ? +data.worker.epochCount
              : 0,
          onChangePage: handleChangePage,
          onChangeRowsPerPage: handleChangeRowsPerPage,
          page: Math.floor(skip / total),
          rowsPerPage: total,
        }}
      />
      <EpochDetailed {...modalProps} modalIsOpen={modalIsOpen} closeModal={closeModal} />
      {loading && <FullLoading />}
    </>
  )
}

export default Epochs
