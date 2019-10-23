import React from 'react'
import ModalWrapper from '../Common/ModalWrapper'
import StrippedGrid, { StrippedGridRow } from '../Common/StrippedGrid'
import GridCell from '../Common/GridCell'

export type WorkerType = {
  balance: string
}

export interface EpochDetailedProps {
  modalIsOpen: boolean
  epochId?: string
  closeModal: () => void
  datesRange?: {
    start: string
    end: string
  }
  tasks?: string
  progress?: string
  epoch?: {
    workers: WorkerType[]
    gasUsed: string
    reward: string
  }
}

const EpochDetailed: React.FC<EpochDetailedProps> = props => {
  const { modalIsOpen, epochId, closeModal, datesRange, tasks, progress, epoch } = props

  if (
    epochId === undefined ||
    datesRange === undefined ||
    tasks === undefined ||
    progress === undefined ||
    epoch === undefined
  )
    return null

  return (
    <ModalWrapper isOpen={modalIsOpen} title={`Epoch #${epochId}`} onRequestClose={closeModal}>
      <StrippedGrid>
        <StrippedGridRow columns={2}>
          <GridCell title="Started On" value={datesRange.start} />
          <GridCell title="Completed On" value={datesRange.end} />
        </StrippedGridRow>
        <StrippedGridRow columns={2}>
          <GridCell title="Tasks Submitted to Epoch" value={tasks} underlineValue={true} />
          <GridCell title="Completed Tasks" value={`${progress}%`} />
        </StrippedGridRow>
        {epoch.workers && (
          <StrippedGridRow columns={2}>
            <GridCell title="Number Of Selected Workers" value={`${epoch.workers.length}`} underlineValue={true} />
            <GridCell
              title="Workers’ Stake"
              value={`${epoch.workers.reduce((acc, { balance }) => acc + +balance, 0)}`}
            />
          </StrippedGridRow>
        )}
        <StrippedGridRow columns={2}>
          <GridCell title="Registered Workers" value={`${epoch.workers && epoch.workers.length}`} />
          <GridCell title="Users" value={'555666'} />
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
