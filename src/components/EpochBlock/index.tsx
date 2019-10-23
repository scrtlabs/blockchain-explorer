import React, { HTMLAttributes } from 'react'
import styled, { withTheme } from 'styled-components'
import Card from '../Common/Card'
import ValueAndSubtitle from '../Common/ValueAndSubtitle'
import TimeLeft from '../Common/TimeLeft'
import ProgressCircle from '../ProgressCircle'
import EpochBlockNumbers, { EpochBlockData } from '../EpochBlockNumbers'
import ethApi from '../../utils/eth'
import EpochDetailed, { EpochProps } from '../EpochDetailed'

export interface ValuesProps {
  blocks: EpochBlockData[]
  current?: boolean
  progress: string
  time: string
  finishTime?: number
}

interface EpochBlockProps extends HTMLAttributes<HTMLDivElement> {
  epoch: EpochProps
  theme: any
  values: ValuesProps
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
  const { values, theme, epoch, ...restProps } = props
  const { current = false, progress, time, blocks = [] } = values
  const endedColor = 'rgba(28, 168, 248, 0.5)'
  const runningColor = 'rgba(231, 46, 157, 0.6)'
  const borderColor: string = current ? theme.colors.secondary : endedColor
  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const [datesRange, setDatesRange] = React.useState({ start: '', end: '' })

  const closeModal = () => setModalIsOpen(false)
  const openModal = () => setModalIsOpen(true)

  const getEndTime = async () => {
    if (current && values.finishTime) {
      const currentBlockTimestamp = await ethApi.getBlockTimestamp(await ethApi.getBlockNumber())
      return +currentBlockTimestamp * 1000 + values.finishTime
    }
    const [, { value: end }] = blocks
    return +(await ethApi.getBlockTimestamp(end)) * 1000
  }

  React.useMemo(() => {
    const updateDates = async () => {
      const endTimeLocal = new Date(await getEndTime()).toLocaleString()
      const startTimeLocal = new Date(+epoch.startTime * 1000).toLocaleString()
      setDatesRange({ start: startTimeLocal, end: endTimeLocal })
    }

    if (values.blocks.length) {
      updateDates()
    }
  }, [blocks.length])

  return (
    <>
      <EpochBlockStyled borderColor={borderColor} onClick={openModal} {...restProps}>
        <ProgressCircleStyled color={current ? runningColor : endedColor} title="Completed Tasks" progress={progress} />
        <Values>
          <TwoItemsGrid>
            <ValueAndSubtitle underlineValue={true} value={`#${epoch.id}`} subtitle="Epoch" />
            <ValueAndSubtitle value={epoch.tasksCount} subtitle="Tasks" />
          </TwoItemsGrid>
          <EpochBlockNumbers values={blocks} current={current} />
        </Values>
        <TimeLeftStyled current={current} value={time} />
      </EpochBlockStyled>
      <EpochDetailed
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        datesRange={datesRange}
        progress={progress}
        epoch={epoch}
      />
    </>
  )
}

export default withTheme(EpochBlock)
