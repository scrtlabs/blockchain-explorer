import React, { HTMLAttributes } from 'react'
import styled, { withTheme } from 'styled-components'
import Card from '../Common/Card'
import theme from 'theme'
import { rgba, darken } from 'polished'
import ArrowIcon from './img/right.svg'
import TimeIcon from './img/time.svg'
import ModalWrapper from '../Common/ModalWrapper'
import GridCell from '../Common/GridCell'
import StrippedGrid, { StrippedGridRow } from '../Common/StrippedGrid'

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
  success,
  submitted,
  failed,
}

interface StatusProps {
  color: string
}

export interface TaskItemProps extends HTMLAttributes<HTMLDivElement> {
  order: string
  status: TaskStatus
  submittedBy: string
  taskID: string
  time: string
  txHash: string
  gasLimit: string
  gasUsed: string
  callback: string | null
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
  const { status = TaskStatus.submitted, order, submittedBy, taskID, time, txHash, gasLimit, gasUsed, callback } = item
  const statusColors = {
    [TaskStatus.failed]: theme.taskStatus.failed,
    [TaskStatus.submitted]: theme.taskStatus.submitted,
    [TaskStatus.success]: theme.taskStatus.success,
  }
  const [modalIsOpen, setModalIsOpen] = React.useState(false)

  const closeModal = () => setModalIsOpen(false)
  const openModal = () => setModalIsOpen(true)

  return (
    <>
      <TaskItem {...restProps}>
        <TaskCard noPadding={true}>
          <StatusBlock color={statusColors[status]}>
            <Number>#{order}</Number>
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
              <InfoValue>{'...'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Tx Hash</InfoLabel>
              <InfoValue onClick={openModal}>{txHash}</InfoValue>
            </InfoItem>
            <InfoItemSeparator />
            <InfoItem>
              <InfoLabel>Task ID</InfoLabel>
              <InfoValueClean>{taskID}</InfoValueClean>
            </InfoItem>
          </TaskInfo>
        </TaskCard>
        <TaskTime>
          <img src={TimeIcon} alt="" /> {time}
        </TaskTime>
      </TaskItem>
      <ModalWrapper isOpen={modalIsOpen} title={`Task #${order}`} onRequestClose={closeModal}>
        <StrippedGrid>
          <StrippedGridRow columns={1}>
            <GridCell title="ID" value={taskID} />
          </StrippedGridRow>
          <StrippedGridRow columns={3}>
            <GridCell title="Task Number" value={order} />
            <GridCell title="Status" valueColor={statusColors[status]} value={statusLabels[status]} />
            <GridCell title="Epoch" value={'#123456789'} underlineValue={true} />
          </StrippedGridRow>
          <StrippedGridRow columns={2}>
            <GridCell title="Submitted On" value={'Sep 25 2019 09:00:00 GMT-0300'} />
            <GridCell title="Completed On" value={'Sep 25 2019 09:00:00 GMT-0300'} />
          </StrippedGridRow>
          <StrippedGridRow columns={1}>
            <GridCell title="Submitted By" value={submittedBy} underlineValue={true} />
          </StrippedGridRow>
          <StrippedGridRow columns={1}>
            <GridCell title="Secret Contract" value={'...'} underlineValue={true} />
          </StrippedGridRow>
          <StrippedGridRow columns={3}>
            <GridCell title="ENG Gas Limit" value={gasLimit} />
            <GridCell title="ENG Gas Used" value={gasUsed} />
            <GridCell title="ENG Gas Price" value={'0.005'} />
          </StrippedGridRow>
          {callback && (
            <StrippedGridRow columns={1}>
              <GridCell title="Callback" underlineValue={true} value={callback} />
            </StrippedGridRow>
          )}
        </StrippedGrid>
      </ModalWrapper>
    </>
  )
}

export default withTheme(TaskBlock)
