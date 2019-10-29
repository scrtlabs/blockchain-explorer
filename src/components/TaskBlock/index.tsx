import React, { HTMLAttributes } from 'react'
import styled, { withTheme } from 'styled-components'
import { History } from 'history'
import theme from 'theme'
import { darken, rgba } from 'polished'
import Card from '../Common/Card'
import TaskDetailed, { TaskDetailedProps } from '../TaskDetailed'
import { TaskBasicData } from '../Tasks'
import ArrowIcon from './img/right.svg'
import TimeIcon from './img/time.svg'

const TaskItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

const TaskCard = styled(Card)`
  > div {
    flex-direction: column;

    @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
      flex-direction: row;
    }
  }
`

const StatusBlock = styled.div<StatusProps>`
  align-items: center;
  background-color: ${props => rgba(props.color, 0.25)};
  border-bottom-width: 1px;
  border-color: ${props => props.color};
  border-left-width: 1px;
  border-right-width: 1px;
  border-style: solid;
  border-top-left-radius: ${props => props.theme.cards.borderRadius};
  border-top-right-radius: ${props => props.theme.cards.borderRadius};
  border-top-width: 6px;
  color: ${props => darken(0.1, props.color)};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  padding: 10px;
  width: 100%;

  @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
    border-bottom-left-radius: ${props => props.theme.cards.borderRadius};
    border-color: ${props => props.color};
    border-left-width: 6px;
    border-top-left-radius: ${props => props.theme.cards.borderRadius};
    border-top-right-radius: 0;
    border-top-width: 1px;
    width: 122px;
  }
`

const Number = styled.h2`
  font-size: 15px;
  font-weight: 600;
  line-height: 1.33;
  margin: 0;
  text-align: center;
`

const StatusLabel = styled.p`
  font-size: 12px;
  font-weight: normal;
  line-height: 1.42;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
`

const TaskInfo = styled.div`
  display: grid;
  flex-grow: 1;
  grid-template-columns: 1fr;
  padding: 10px;
  row-gap: 20px;

  @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
    grid-template-columns: auto 1fr auto;
    padding: 10px 20px 10px 15px;
    row-gap: 13px;
  }
`

const InfoItem = styled.div`
  min-width: 0;
  max-width: 100%;

  @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
    min-width: 0;
    max-width: 528px;

    &:first-child,
    &:nth-child(4n) {
      padding-right: 20px;
    }

    &:nth-child(3n) {
      padding-left: 20px;
    }
  }
`

const InfoItemSeparator = styled.div`
  display: none;

  @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
    display: block;
  }
`

const ArrowContainer = styled(InfoItemSeparator)`
  @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
    align-items: center;
    display: flex;
    justify-content: center;
  }
`

const InfoLabel = styled.h3`
  color: ${props => props.theme.colors.textLight};
  font-size: 13px;
  font-weight: 600;
  line-height: 1.36;
  margin: 0;
`

const InfoValue = styled.span`
  color: ${props => props.theme.colors.textCommon};
  cursor: pointer;
  display: block;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.42;
  margin: 0;
  max-width: 100%;
  overflow: hidden;
  text-decoration: underline;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const InfoValueClean = styled(InfoValue)`
  cursor: default;
  text-decoration: none;
`

const TaskTime = styled.div`
  align-items: center;
  color: ${props => props.theme.colors.textLight};
  display: flex;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.4;
  margin-left: auto;
  margin-right: 4px;
  margin-top: 1px;

  > img {
    margin-right: 3px;
    margin-top: 2px;
  }
`

export enum TaskStatus {
  'RecordCreated' = 'Submitted',
  'ReceiptVerified' = 'Success',
  'ReceiptFailedENG' = 'Failed',
  'ReceiptFailedETH' = 'Failed',
  'ReceiptFailedReturn' = 'Failed',
  'ReceiptFailed' = 'Failed',
}

interface StatusProps {
  color: string
}

interface TaskBlockProps extends HTMLAttributes<HTMLDivElement> {
  task: TaskBasicData
  theme?: any
  history: History
}

const TaskBlock: React.FC<TaskBlockProps> = (props: TaskBlockProps) => {
  const { task, history, ...restProps } = props
  const { status = TaskStatus.ReceiptVerified, order, sender, id, time, createdAtTransaction } = task
  const taskStatus = TaskStatus[status as keyof typeof TaskStatus] || 'Success'
  const taskStatusColor = theme.taskStatus[taskStatus.toLowerCase() as keyof typeof theme.taskStatus]

  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const closeModal = () => setModalIsOpen(false)
  const openModal = () => setModalIsOpen(true)

  const goToUserDetails = () => {
    if (sender) {
      history.push(`/tasks/${sender}`)
    }
  }

  const goToSecretContractDetails = () => {
    if (task && task.secretContract && task.secretContract.address) {
      history.push(`/contract/${task.secretContract.address}`)
    }
  }

  const taskDetailedProps: TaskDetailedProps = { ...task, taskStatus, taskStatusColor, modalIsOpen, closeModal }

  return (
    <>
      <TaskItem {...restProps}>
        <TaskCard noPadding={true}>
          <StatusBlock color={taskStatusColor}>
            <Number>#{order}</Number>
            <StatusLabel>{taskStatus}</StatusLabel>
          </StatusBlock>
          <TaskInfo>
            <InfoItem>
              <InfoLabel>Submitted By</InfoLabel>
              <InfoValue onClick={goToUserDetails}>{sender}</InfoValue>
            </InfoItem>
            <ArrowContainer>
              <img src={ArrowIcon} alt="" />
            </ArrowContainer>
            <InfoItem>
              <InfoLabel>Secret Contract</InfoLabel>
              {task.secretContract ? (
                <InfoValue onClick={goToSecretContractDetails}>{task.secretContract.address}</InfoValue>
              ) : (
                <InfoValueClean>-</InfoValueClean>
              )}
            </InfoItem>
            <InfoItem>
              <InfoLabel>Tx Hash</InfoLabel>
              <InfoValueClean>{createdAtTransaction}</InfoValueClean>
            </InfoItem>
            <InfoItemSeparator />
            <InfoItem>
              <InfoLabel>Task ID</InfoLabel>
              <InfoValue onClick={openModal}>{id}</InfoValue>
            </InfoItem>
          </TaskInfo>
        </TaskCard>
        <TaskTime>
          <img src={TimeIcon} alt="" /> {time}
        </TaskTime>
      </TaskItem>
      <TaskDetailed {...taskDetailedProps} history={history} />
    </>
  )
}

export default withTheme(TaskBlock)
