import React from 'react'
import ModalWrapper from '../Common/ModalWrapper'
import StrippedGrid, { StrippedGridRow } from '../Common/StrippedGrid'
import GridCell from '../Common/GridCell'
import { TaskStatus } from '../TaskBlock'
import { TaskBasicData } from '../TasksHome'
import ethApi from '../../utils/eth'

export interface TaskDetailedProps extends TaskBasicData {
  modalIsOpen: boolean
  closeModal: () => void
  taskStatusColor: string
  taskStatus: TaskStatus
}

const TaskDetailed: React.FC<TaskDetailedProps | any> = props => {
  const {
    id,
    order,
    sender,
    createdAt,
    modifiedAt,
    gasLimit,
    gasUsed,
    gasPrice,
    scAddr,
    optionalEthereumContractAddress,
    modalIsOpen = false,
    closeModal,
    taskStatusColor,
    taskStatus,
  } = props

  return (
    <ModalWrapper isOpen={modalIsOpen} title={`Task #${order}`} onRequestClose={closeModal}>
      <StrippedGrid>
        <StrippedGridRow columns={1}>
          <GridCell title="ID" value={id} />
        </StrippedGridRow>
        <StrippedGridRow columns={3}>
          <GridCell title="Task Number" value={order} />
          <GridCell title="Status" valueColor={taskStatusColor} value={taskStatus} />
          <GridCell title="Epoch" value={'#123456789'} underlineValue={true} />
        </StrippedGridRow>
        <StrippedGridRow columns={2}>
          <GridCell title="Submitted On" value={new Date(createdAt * 1000).toLocaleString()} />
          <GridCell title="Completed On" value={modifiedAt ? new Date(modifiedAt * 1000).toLocaleString() : '...'} />
        </StrippedGridRow>
        <StrippedGridRow columns={1}>
          <GridCell title="Submitted By" value={sender} underlineValue={true} />
        </StrippedGridRow>
        <StrippedGridRow columns={1}>
          <GridCell title="Secret Contract" value={scAddr} underlineValue={true} />
        </StrippedGridRow>
        <StrippedGridRow columns={3}>
          <GridCell title="ENG Gas Limit" value={gasLimit} />
          <GridCell title="ENG Gas Used" value={gasUsed} />
          <GridCell title="ENG Gas Price" value={gasPrice} />
        </StrippedGridRow>
        {optionalEthereumContractAddress && ethApi.web3.utils.toBN(optionalEthereumContractAddress).toString() !== '0' && (
          <StrippedGridRow columns={1}>
            <GridCell title="Callback" underlineValue={true} value={optionalEthereumContractAddress} />
          </StrippedGridRow>
        )}
      </StrippedGrid>
    </ModalWrapper>
  )
}

export default TaskDetailed
