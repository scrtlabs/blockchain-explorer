import React, { HTMLAttributes } from 'react'
import styled, { withTheme } from 'styled-components'
import Card from '../Common/Card'
import theme from 'theme'
import { rgba, darken } from 'polished'
import ArrowIcon from './img/right.svg'
import TimeIcon from './img/time.svg'

const TaskItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

const TaskCard = styled(Card)`
  > div {
    flex-direction: row;
  }
`

const StatusBlock = styled.div<StatusProps>`
  align-items: center;
  background-color: ${props => rgba(props.color, 0.25)};
  border-bottom-left-radius: ${props => props.theme.cards.borderRadius};
  border-bottom-width: 1px;
  border-color: ${props => props.color};
  border-left-width: 6px;
  border-right-width: 1px;
  border-style: solid;
  border-top-left-radius: ${props => props.theme.cards.borderRadius};
  border-top-width: 1px;
  color: ${props => darken(0.1, props.color)};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  width: 122px;
  padding: 10px;
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
  grid-template-columns: auto 1fr auto;
  padding: 10px 20px 10px 15px;
  row-gap: 13px;
`

const InfoItem = styled.div`
  min-width: 0;
  max-width: 528px;

  &:first-child,
  &:nth-child(4n) {
    padding-right: 20px;
  }

  &:nth-child(3n) {
    padding-left: 20px;
  }
`

const InfoItemSeparator = styled.div`
  /* width: 20px; */
`

const ArrowContainer = styled(InfoItemSeparator)`
  align-items: center;
  display: flex;
  justify-content: center;
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
  success,
  submitted,
  failed,
}

interface StatusProps {
  color: string
}

export interface TaskItemProps extends HTMLAttributes<HTMLDivElement> {
  number: string
  secretContract: string
  status: TaskStatus
  submittedBy: string
  taskID: string
  time: string
  txHash: string
}

interface TaskBlockProps extends HTMLAttributes<HTMLDivElement> {
  item: TaskItemProps
  theme?: any
}

const statusLabels = {
  [TaskStatus.failed]: 'Failed',
  [TaskStatus.submitted]: 'Submitted',
  [TaskStatus.success]: 'Success',
}

const TaskBlock: React.FC<TaskBlockProps> = (props: TaskBlockProps) => {
  const { item, ...restProps } = props
  const { status = TaskStatus.submitted, number, secretContract, submittedBy, taskID, time, txHash } = item
  const statusColors = {
    [TaskStatus.failed]: theme.taskStatus.failed,
    [TaskStatus.submitted]: theme.taskStatus.submitted,
    [TaskStatus.success]: theme.taskStatus.success,
  }

  return (
    <TaskItem {...restProps}>
      <TaskCard noPadding={true}>
        <StatusBlock color={statusColors[status]}>
          <Number>#{number}</Number>
          <StatusLabel>{statusLabels[status]}</StatusLabel>
        </StatusBlock>
        <TaskInfo>
          <InfoItem>
            <InfoLabel>Submitted By</InfoLabel>
            <InfoValue>{submittedBy}</InfoValue>
          </InfoItem>
          <ArrowContainer>
            <img src={ArrowIcon} alt="" />
          </ArrowContainer>
          <InfoItem>
            <InfoLabel>Secret Contract</InfoLabel>
            <InfoValue>{secretContract}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Tx Hash</InfoLabel>
            <InfoValue>{txHash}</InfoValue>
          </InfoItem>
          <InfoItemSeparator />
          <InfoItem>
            <InfoLabel>Task ID</InfoLabel>
            <InfoValueClean>{taskID}</InfoValueClean>
          </InfoItem>
        </TaskInfo>
      </TaskCard>
      <TaskTime><img src={TimeIcon} alt="" /> {time}</TaskTime>
    </TaskItem>
  )
}

export default withTheme(TaskBlock)
