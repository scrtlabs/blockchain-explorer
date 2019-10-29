import React from 'react'
import { History } from 'history'
import ModalWrapper from '../Common/ModalWrapper'
import StrippedGrid, { StrippedGridRow } from '../Common/StrippedGrid'
import GridCell from '../Common/GridCell'
import { TaskStatus } from '../TaskBlock'
import { TaskBasicData } from '../Tasks'
import ethApi from '../../utils/eth'

export interface TaskDetailedProps extends TaskBasicData {
  modalIsOpen: boolean
  closeModal: () => void
  taskStatusColor: string
  taskStatus: TaskStatus
  history?: History
}

const TaskDetailed: React.FC<TaskDetailedProps> = props => {
  const {
    id,
    order,
    sender,
    createdAt,
    modifiedAt,
    gasLimit,
    gasUsed,
    gasPrice,
    secretContract,
    epoch,
    optionalEthereumContractAddress,
    modalIsOpen = false,
    closeModal,
    taskStatusColor,
    taskStatus,
    history,
  } = props

  const goToSecretContractDetails = () => {
    if (secretContract && !!secretContract.address) {
      console.log(history)
      history && history.push(`/contract/${secretContract.address}`)
    }
  }

  const goToEpochDetails = () => {
    if (epoch && epoch.id) {
      history && history.push(`/epochs/${epoch.id}`)
    }
  }

  const goToUserDetails = () => {
    if (sender) {
      history && history.push(`/tasks/${sender}`)
    }
  }

  const openEthContractDetails = () => {
    if (optionalEthereumContractAddress) {
      // TODO: open new tab with etherscan details
    }
  }
  return (
    <ModalWrapper isOpen={modalIsOpen} title={`Task #${order}`} onRequestClose={closeModal}>
      <StrippedGrid>
        <StrippedGridRow columns={1}>
          <GridCell title="ID" value={id} />
        </StrippedGridRow>
        <StrippedGridRow columns={3}>
          <GridCell title="Task Number" value={order} />
          <GridCell title="Status" valueColor={taskStatusColor} value={taskStatus} />
          <GridCell title="Epoch" value={epoch && epoch.id} underlineValue={true} onClick={goToEpochDetails} />
        </StrippedGridRow>
        <StrippedGridRow columns={2}>
          <GridCell title="Submitted On" value={new Date(+createdAt * 1000).toLocaleString()} />
          <GridCell
            title="Completed On"
            value={modifiedAt ? new Date(+modifiedAt * 1000).toLocaleString() : 'not processed'}
          />
        </StrippedGridRow>
        <StrippedGridRow columns={1}>
          <GridCell title="Submitted By" value={sender} underlineValue={true} onClick={goToUserDetails} />
        </StrippedGridRow>
        <StrippedGridRow columns={1}>
          <GridCell
            title="Secret Contract"
            value={secretContract ? secretContract.address : '-'}
            underlineValue={!!secretContract && !!secretContract.address}
            onClick={goToSecretContractDetails}
          />
        </StrippedGridRow>
        <StrippedGridRow columns={3}>
          <GridCell title="ENG Gas Limit" value={gasLimit || '-'} />
          <GridCell title="ENG Gas Used" value={gasUsed || '-'} />
          <GridCell title="ENG Gas Price" value={gasPrice || '-'} />
        </StrippedGridRow>
        {optionalEthereumContractAddress && ethApi.web3.utils.toBN(optionalEthereumContractAddress).toString() !== '0' && (
          <StrippedGridRow columns={1}>
            <GridCell
              title="Callback"
              underlineValue={true}
              value={optionalEthereumContractAddress}
              onClick={openEthContractDetails}
            />
          </StrippedGridRow>
        )}
      </StrippedGrid>
    </ModalWrapper>
  )
}

export default TaskDetailed
