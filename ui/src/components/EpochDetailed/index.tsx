import React from 'react'
import ModalWrapper from '../Common/ModalWrapper'
import StrippedGrid, { StrippedGridRow } from '../Common/StrippedGrid'
import GridCell from '../Common/GridCell'
import { EpochBlocksInfoProps, EpochBasicData } from '../Epochs/types'

export type WorkerType = {
  balance: string
}

export interface EpochDetailedProps {
  modalIsOpen: boolean
  closeModal: () => void
  isCurrent?: boolean
  progress?: string | null
  pendingTime?: number
  blocks?: EpochBlocksInfoProps[]
  epoch?: EpochBasicData
}

const EpochDetailed: React.FC<EpochDetailedProps> = props => {
  const { modalIsOpen, closeModal, isCurrent, progress, pendingTime, blocks, epoch } = props
  const [selectedWorkers, setSelectedWorkers] = React.useState([])

  React.useEffect(() => {
    const retrieveWorkers = async () => {
      const workers = epoch ? await (await fetch(`${process.env.REACT_APP_ENIGMA_API}/epochs/${epoch.id}`)).json() : []
      setSelectedWorkers(workers)
    }

    if (epoch) {
      retrieveWorkers()
    }
  }, [epoch])

  if (epoch === undefined) return null

  // Dates Range
  const start = new Date(+epoch.startTime * 1000).toLocaleString()
  const end = new Date(
    pendingTime !== undefined && isCurrent ? Date.now() + +pendingTime : +epoch.endTime * 1000,
  ).toLocaleString()

  return (
    <ModalWrapper isOpen={modalIsOpen} title={`Epoch #${epoch.id}`} onRequestClose={closeModal}>
      <StrippedGrid>
        <StrippedGridRow columns={2}>
          <GridCell title="Started On" value={start} />
          <GridCell title={isCurrent ? 'Estimated Completion Time' : 'Completed On'} value={end} />
        </StrippedGridRow>
        <StrippedGridRow columns={2}>
          <GridCell title="Tasks Submitted to Epoch" value={epoch.taskCount} underlineValue={false} />
          <GridCell title="Completed Tasks" value={progress === null ? '-' : `${progress}%`} />
        </StrippedGridRow>
        <StrippedGridRow columns={2}>
          <GridCell title="Registered Workers" value={epoch.workerCount || '-'} />
          <GridCell title="Selected Workers" value={`${selectedWorkers.length}` || '-'} />
        </StrippedGridRow>
        <StrippedGridRow columns={1}>
          <GridCell title="Unique Users" value={epoch.userCount || '-'} />
        </StrippedGridRow>
        {blocks && (
          <StrippedGridRow columns={blocks.length}>
            {blocks.map(block => (
              <GridCell key={`${block.title}_${block.value}`} title={block.title} value={`${block.value}`} />
            ))}
          </StrippedGridRow>
        )}
        <StrippedGridRow columns={3}>
          <GridCell title="ENG Staked" value={epoch.stakes.reduce((acc, stake) => acc + +stake, 0).toString()} />
          <GridCell title="ENG Gas Used" value={epoch.gasUsed} />
          <GridCell title="ENG Reward" value={'-'} />
        </StrippedGridRow>
      </StrippedGrid>
    </ModalWrapper>
  )
}

export default EpochDetailed