import React, { HTMLAttributes } from 'react'
import styled, { withTheme } from 'styled-components'
import Card from '../Common/Card'
import theme from 'theme'

const TaskBlockStyled = styled(Card)`
  display: flex;
`

const StatusBlock = styled.div<StatusProps>`
  align-items: center;
  border-bottom-left-radius: ${props => props.theme.card.borderRadius};
  border-bottom-width: 1px;
  border-color: ${props => props.color};
  border-left-width: 6px;
  border-right-width: 1px;
  border-top-left-radius: ${props => props.theme.card.borderRadius};
  border-top-width: 1px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: center;
  max-width: 122px;
  color: ${props => props.color};
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

export enum TaskStatus {
  success,
  submitted,
  failed,
}

interface StatusProps {
  color: string
}

export interface TaskBlockProps extends HTMLAttributes<HTMLDivElement> {
  number: string
  secretContract: string
  status: TaskStatus
  submittedBy: string
  taskID: string
  theme?: any
  time: string
  txHash: string
}

export const statusLabels = {
  [TaskStatus.failed]: 'Failed',
  [TaskStatus.submitted]: 'Submitted',
  [TaskStatus.success]: 'Success',
}

const TaskBlock: React.FC<TaskBlockProps> = (props: TaskBlockProps) => {
  const {
    status = TaskStatus.submitted,
    number,
    secretContract,
    submittedBy,
    taskID,
    time,
    txHash,
    ...restProps
  } = props
  const statusColors = {
    [TaskStatus.failed]: theme.taskStatus.failed,
    [TaskStatus.submitted]: theme.taskStatus.submitted,
    [TaskStatus.success]: theme.taskStatus.success,
  }

  return (
    <TaskBlockStyled {...restProps}>
      <StatusBlock color={statusColors[status]}>
        <Number>{number}</Number>
        <StatusLabel>{statusLabels[status]}</StatusLabel>
      </StatusBlock>
    </TaskBlockStyled>
  )
}

export default withTheme(TaskBlock)
