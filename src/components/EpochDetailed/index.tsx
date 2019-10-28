import React from 'react'
import ModalWrapper from '../Common/ModalWrapper'
import StrippedGrid, { StrippedGridRow } from '../Common/StrippedGrid'
import GridCell from '../Common/GridCell'
import { EpochBlocksInfoProps, EpochProps } from '../Epochs'

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
  epoch?: EpochProps
}

const EpochDetailed: React.FC<EpochDetailedProps> = props => {
  const { modalIsOpen, closeModal, isCurrent, progress, pendingTime, blocks, epoch } = props

  if (epoch === undefined) return null

  // Dates Range
  const start = new Date(+epoch.startTime * 1000).toLocaleString()
  const end = new Date(pendingTime !== undefined ? Date.now() + +pendingTime : +epoch.endTime * 1000).toLocaleString()

  return (
    <ModalWrapper isOpen={modalIsOpen} title={`Epoch #${epoch.id}`} onRequestClose={closeModal}>
      <StrippedGrid>
        <StrippedGridRow columns={2}>
          <GridCell title="Started On" value={start} />
          <GridCell title={isCurrent ? 'Estimated Completion Time' : 'Completed On'} value={end} />
        </StrippedGridRow>
        <StrippedGridRow columns={2}>
          <GridCell title="Tasks Submitted to Epoch" value={epoch.taskCount} underlineValue={true} />
          <GridCell title="Completed Tasks" value={progress === null ? '-' : `${progress}%`} />
        </StrippedGridRow>
        <StrippedGridRow columns={2}>
          <GridCell title="Registered Workers" value={epoch.workerCount || '-'} />
          <GridCell title="Selected Workers" value={'-'} />
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
          <GridCell title="ENG Staked" value={'-'} />
          <GridCell title="ENG Gas Used" value={epoch.gasUsed} />
          <GridCell title="ENG Reward" value={'-'} />
        </StrippedGridRow>
      </StrippedGrid>
    </ModalWrapper>
  )
}

export default EpochDetailed
