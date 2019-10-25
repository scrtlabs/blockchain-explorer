import React from 'react'
import ModalWrapper from '../Common/ModalWrapper'
import StrippedGrid, { StrippedGridRow } from '../Common/StrippedGrid'
import GridCell from '../Common/GridCell'
import { EpochProps } from '../Epochs'

export type WorkerType = {
  balance: string
}

export interface EpochDetailedProps {
  modalIsOpen: boolean
  closeModal: () => void
  progress?: string
  pendingTime?: number
  epoch?: EpochProps
}

const EpochDetailed: React.FC<EpochDetailedProps> = props => {
  const { modalIsOpen, closeModal, progress, pendingTime, epoch } = props

  if (epoch === undefined) return null

  // Dates Range
  const start = new Date(+epoch.startTime * 1000).toLocaleString()
  const end = new Date(pendingTime !== undefined ? Date.now() + +pendingTime : +epoch.endTime * 1000).toLocaleString()

  return (
    <ModalWrapper isOpen={modalIsOpen} title={`Epoch #${epoch.id}`} onRequestClose={closeModal}>
      <StrippedGrid>
        <StrippedGridRow columns={2}>
          <GridCell title="Started On" value={start} />
          <GridCell title="Completed On" value={end} />
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
