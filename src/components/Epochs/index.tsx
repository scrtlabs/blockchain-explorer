import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { History } from 'history'
import BaseTable from '../Common/BaseTable'
import { FlexAlign } from '../Common/EnhancedTableHead'
import SectionTitle from '../Common/SectionTitle'
import FullLoading from '../Common/FullLoading'
import { shortEngHumanizer } from '../../utils/humanizer'
import EpochDetailed, { EpochDetailedProps } from '../EpochDetailed'
import estimateCurrentEpochEnd from '../../utils/estimateCurrentEpochEnd'
import { EpochBlockTypes } from '../EpochBlockNumbers'
import ethApi from '../../utils/eth'
import SearchBar from '../Common/SearchBar'
import { DocumentNode } from 'graphql'
import { LinkText } from '../Common/LinkText'
import { EpochBasicData, FieldToGraph, GraphToField, Direction, EpochBlocksInfoProps } from './types'
import { EPOCHS_QUERY, EPOCHS_BY_WORKER_QUERY, EPOCH_BY_ID_QUERY, EPOCHS_INITIAL_VALUES } from './queries'

interface EpochsProps extends React.HTMLAttributes<HTMLDivElement> {
  byParam: boolean
  history?: History
  query: DocumentNode
  queryVariables: any
}

interface EpochIdProps {
  onClick: () => void
  id: string
}
const EpochId: React.FC<EpochIdProps> = ({ id, onClick }) => (
  <LinkText underline={true} onClick={onClick}>
    #{id}
  </LinkText>
)

const calculateProgress = ({ taskCount, completedTaskCount }: EpochBasicData) =>
  +taskCount === 0 ? null : `${+(+completedTaskCount / +taskCount).toFixed(2) * 100}`

const HEADER_CELLS = [
  { id: 'epochId', useClassShowOnDesktop: false, sortable: true, align: FlexAlign.start, label: 'Number' },
  { id: 'epochAge', useClassShowOnDesktop: false, sortable: false, align: FlexAlign.center, label: 'Age' },
  {
    id: 'epochTotalTasks',
    useClassShowOnDesktop: false,
    sortable: true,
    align: FlexAlign.end,
    label: 'Number Of Tasks',
  },
  {
    id: 'epochCompleteTasks',
    useClassShowOnDesktop: true,
    sortable: false,
    align: FlexAlign.end,
    label: '% Of Completed Tasks',
  },
  {
    id: 'epochWorkers',
    useClassShowOnDesktop: true,
    sortable: true,
    align: FlexAlign.end,
    label: 'Number Of Selected Workers',
  },
  { id: 'epochEngGasUsed', useClassShowOnDesktop: true, sortable: true, align: FlexAlign.end, label: 'ENG Gas Used' },
  { id: 'epochEngReward', useClassShowOnDesktop: false, sortable: true, align: FlexAlign.end, label: 'ENG Reward' },
]

const EpochsWrapper: React.FC<any> = ({ title = 'Epochs', workerId, epoches, match = { params: {} }, history }) => {
  const {
    params: { epochId },
  } = match
  const [epochParams, setEpochParams] = React.useState({ query: EPOCHS_QUERY, queryVariables: EPOCHS_INITIAL_VALUES })

  React.useEffect(() => {
    if (epochId) {
      setEpochParams({ query: EPOCH_BY_ID_QUERY, queryVariables: { ...EPOCHS_INITIAL_VALUES, epochId } })
    }
  }, [epochId])

  React.useMemo(() => {
    if (workerId && epoches.length) {
      setEpochParams({ query: EPOCHS_BY_WORKER_QUERY, queryVariables: { ...EPOCHS_INITIAL_VALUES, workerId, epoches } })
    }
  }, [workerId, epoches])

  React.useMemo(() => {
    if (!epochId) {
      setEpochParams({ query: EPOCHS_QUERY, queryVariables: EPOCHS_INITIAL_VALUES })
    }
  }, [epochId])

  const handleRequestSearch = async (event: React.SyntheticEvent<React.FormEvent>, epochId: any) => {
    event.preventDefault()
    event.stopPropagation()

    if (!epochId) return

    setEpochParams({ query: EPOCH_BY_ID_QUERY, queryVariables: { ...EPOCHS_INITIAL_VALUES, epochId } })
  }

  const handleClearSearch = () => {
    setEpochParams({ query: EPOCHS_QUERY, queryVariables: EPOCHS_INITIAL_VALUES })
  }

  const right =
    !workerId && !epochId ? (
      <SearchBar
        placeholder="Search by Epoch number..."
        onRequestSearch={handleRequestSearch}
        onClearSearch={handleClearSearch}
      />
    ) : null

  return (
    <>
      <SectionTitle right={right}>{title}</SectionTitle>
      <Epochs {...epochParams} history={history} byParam={!!epochId} />
    </>
  )
}

const Epochs: React.FC<EpochsProps> = ({ byParam, history, query, queryVariables }: EpochsProps) => {
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

    if (byParam && history) {
      history.replace(`/epochs`)
    }
  }

  const openModal = async (epoch: EpochBasicData) => {
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

  const extractEpochData = (epoch: EpochBasicData, index: number) => {
    const isCurrent: boolean = epoch.id === data.enigmaState.latestEpoch.id
    const age = isCurrent ? 'current' : shortEngHumanizer(Date.now() - +epoch.endTime * 1000)
    const progress = calculateProgress(epoch)

    const id = {
      align: HEADER_CELLS[0].align,
      useClassShowOnDesktop: false,
      id: `${epoch.id}_${epoch.id}`,
      value: <EpochId id={epoch.id} onClick={() => openModal(epoch)} />,
    }
    const epochAge = {
      align: HEADER_CELLS[1].align,
      useClassShowOnDesktop: false,
      id: `${epoch.id}_${age}_age`,
      value: age,
    }
    const taskCount = {
      align: HEADER_CELLS[2].align,
      useClassShowOnDesktop: false,
      id: `${epoch.id}_${epoch.taskCount}_tasks_${index}`,
      value: epoch.taskCount,
    }
    const epochProgress = {
      align: HEADER_CELLS[3].align,
      useClassShowOnDesktop: true,
      id: `${epoch.id}_${epoch.completedTaskCount + epoch.taskCount + epoch.failedTaskCount}_${index}`,
      value: progress === null ? '-' : `${progress}%`,
    }
    const workerCount = {
      align: HEADER_CELLS[4].align,
      useClassShowOnDesktop: true,
      id: `${epoch.id}_${epoch.workerCount}_w_${index}`,
      value: epoch.workerCount || '-',
    }
    const gasUsed = {
      align: HEADER_CELLS[5].align,
      useClassShowOnDesktop: true,
      id: `${epoch.id}_${epoch.gasUsed}_gu_${index}`,
      value: epoch.gasUsed || '-',
    }
    const reward = {
      align: HEADER_CELLS[6].align,
      useClassShowOnDesktop: false,
      id: `${epoch.id}_${epoch.reward}_rw_${index}`,
      value: '-',
    }

    return {
      id: epoch.id,
      cells: [id, epochAge, taskCount, epochProgress, workerCount, gasUsed, reward],
    }
  }

  React.useMemo(() => {
    if (byParam && data && data.epoch) {
      openModal(data.epoch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [byParam, data])

  return (
    <>
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
              ? variables.epoches.length
              : 0,
          onChangePage: handleChangePage,
          onChangeRowsPerPage: handleChangeRowsPerPage,
          page: Math.floor(skip / total),
          rowsPerPage: total,
        }}
      />
      <EpochDetailed {...modalProps} modalIsOpen={modalIsOpen} closeModal={closeModal} />
      {loading && !data && <FullLoading />}
    </>
  )
}

export default EpochsWrapper
