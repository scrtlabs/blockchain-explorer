import React, { HTMLAttributes } from 'react'
import styled, { withTheme } from 'styled-components'
import Card from '../Common/Card'
import ValueAndSubtitle from '../Common/ValueAndSubtitle'
import TimeLeft from '../Common/TimeLeft'
import ProgressCircle from '../ProgressCircle'
import EpochBlockNumbers, { EpochBlockTypes } from '../EpochBlockNumbers'
import EpochDetailed from '../EpochDetailed'
import { shortEngHumanizer } from '../../utils/humanizer'
import { EpochBlocksInfoProps, EpochProps } from 'components/Epochs'

export interface EpochBlockProps extends HTMLAttributes<HTMLDivElement> {
  isCurrent: boolean
  currentBlockNumber: number
  finishBlockNumber: number
  pendingTime?: number
  epoch: EpochProps
  theme?: any
}

interface BlockProps extends HTMLAttributes<HTMLDivElement> {
  borderColor?: string
}

const EpochBlockStyled = styled(Card)<BlockProps>`
  cursor: pointer;
  padding: 19px 10px 12px;
  position: relative;
  transition: box-shadow 0.15s linear;

  &::before {
    background-color: ${props => props.borderColor};
    border-top-left-radius: ${props => props.theme.cards.borderRadius};
    border-top-right-radius: ${props => props.theme.cards.borderRadius};
    content: '';
    height: 6px;
    left: 0;
    position: absolute;
    top: -1px;
    width: 100%;
  }

  &:hover {
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
  }

  > div {
    flex-direction: column;

    @media (min-width: ${props => props.theme.themeBreakPoints.xxl}) {
      flex-direction: row;
    }
  }
`

const TimeLeftStyled = styled(TimeLeft)`
  bottom: -18px;
  position: absolute;
  right: 3px;
`

const ProgressCircleStyled = styled(ProgressCircle)`
  flex-shrink: 0;
  margin: 0 auto 20px;

  @media (min-width: ${props => props.theme.themeBreakPoints.xxl}) {
    margin-bottom: 0;
    margin-right: 15px;
  }
`

const Values = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`

const TwoItemsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  margin-bottom: 10px;

  > div {
    position: relative;
  }

  > div:first-child:after {
    background-color: ${props => props.theme.borders.borderColor};
    content: '';
    height: 34px;
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
  }
`

const EpochBlock: React.FC<EpochBlockProps> = (props: EpochBlockProps) => {
  const { isCurrent, currentBlockNumber, finishBlockNumber, pendingTime, epoch, theme, ...restProps } = props

  const endedColor = 'rgba(28, 168, 248, 0.5)'
  const runningColor = 'rgba(231, 46, 157, 0.6)'
  const borderColor: string = isCurrent ? theme.colors.secondary : endedColor

  const progress = +epoch.taskCount === 0 ? null : `${+(+epoch.completedTaskCount / +epoch.taskCount).toFixed(2) * 100}`

  const time = shortEngHumanizer(pendingTime !== undefined ? +pendingTime : Date.now() - +epoch.endTime * 1000)

  const blocks: EpochBlocksInfoProps[] = [
    { value: epoch.startBlockNumber, title: 'First Block', type: EpochBlockTypes.first },
  ]

  if (isCurrent) {
    const value = finishBlockNumber > currentBlockNumber ? finishBlockNumber : currentBlockNumber
    blocks.push({ value: currentBlockNumber, title: 'Current Block', type: EpochBlockTypes.current })
    blocks.push({ value, title: 'Last Block', type: EpochBlockTypes.last })
  } else {
    blocks.push({ value: epoch.endBlockNumber, title: 'Last Block', type: EpochBlockTypes.last })
  }

  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const closeModal = () => setModalIsOpen(false)
  const openModal = () => setModalIsOpen(true)

  return (
    <>
      <EpochBlockStyled borderColor={borderColor} onClick={openModal} {...restProps}>
        <ProgressCircleStyled
          color={isCurrent ? runningColor : endedColor}
          title={+epoch.taskCount ? 'Completed Tasks' : 'No Tasks Submitted'}
          progress={+epoch.taskCount ? progress : null}
        />
        <Values>
          <TwoItemsGrid>
            <ValueAndSubtitle underlineValue={true} value={`#${epoch.id}`} subtitle="Epoch" />
            <ValueAndSubtitle value={epoch.taskCount} subtitle="Tasks" />
          </TwoItemsGrid>
          <EpochBlockNumbers values={blocks} current={isCurrent} />
        </Values>
        <TimeLeftStyled current={isCurrent} value={time} />
      </EpochBlockStyled>
      <EpochDetailed
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        isCurrent={isCurrent}
        progress={progress}
        pendingTime={pendingTime}
        blocks={blocks}
        epoch={epoch}
      />
    </>
  )
}

export default withTheme(EpochBlock)
