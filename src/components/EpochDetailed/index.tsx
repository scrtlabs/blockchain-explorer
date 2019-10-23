import React from 'react'
import ModalWrapper from '../Common/ModalWrapper'
import StrippedGrid, { StrippedGridRow } from '../Common/StrippedGrid'
import GridCell from '../Common/GridCell'

export type WorkerType = {
  balance: string
}

export interface EpochProps {
  id: string
  completeBlockNumber: string
  inclusionBlockNumber: string
  startBlockNumber: string
  startTime: string
  workers: WorkerType[]
  tasks: any[]
  taskCount: string
  workerCount: string
  userCount: string
  gasUsed: string
  reward: string
}

export interface EpochDetailedProps {
  modalIsOpen: boolean
  closeModal: () => void
  datesRange?: {
    start: string
    end: string
  }
  progress?: string
  epoch?: EpochProps
}

const EpochDetailed: React.FC<EpochDetailedProps> = props => {
  const { modalIsOpen, closeModal, datesRange, progress, epoch } = props

  if (datesRange === undefined || progress === undefined || epoch === undefined) return null

  return (
    <ModalWrapper isOpen={modalIsOpen} title={`Epoch #${epoch.id}`} onRequestClose={closeModal}>
      <StrippedGrid>
        <StrippedGridRow columns={2}>
          <GridCell title="Started On" value={datesRange.start} />
          <GridCell title="Completed On" value={datesRange.end} />
        </StrippedGridRow>
        <StrippedGridRow columns={2}>
          <GridCell title="Tasks Submitted to Epoch" value={epoch.taskCount} underlineValue={true} />
          <GridCell title="Completed Tasks" value={`${progress}%`} />
        </StrippedGridRow>
        <StrippedGridRow columns={2}>
          <GridCell title="Registered Workers" value={epoch.workerCount} />
          <GridCell title="Users" value={epoch.userCount} />
        </StrippedGridRow>
        <StrippedGridRow columns={2}>
          <GridCell title="ENG Gas Used" value={epoch.gasUsed} />
          <GridCell title="ENG Reward" value={epoch.reward} />
        </StrippedGridRow>
      </StrippedGrid>
    </ModalWrapper>
  )
}

export default EpochDetailed
