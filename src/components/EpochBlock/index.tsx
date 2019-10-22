import React, { HTMLAttributes } from 'react'
import styled, { withTheme } from 'styled-components'
import Card from '../Common/Card'
import ValueAndSubtitle from '../Common/ValueAndSubtitle'
import TimeLeft from '../Common/TimeLeft'
import ProgressCircle from '../ProgressCircle'
import ModalWrapper from '../Common/ModalWrapper'
import GridCell from '../Common/GridCell'
import EpochBlockNumbers, { EpochBlockData } from '../EpochBlockNumbers'
import StrippedGrid, { StrippedGridRow } from '../Common/StrippedGrid'
import ethApi from '../../utils/eth'
import shrinkHexString from '../../utils/shrinkHexString'

export interface ValuesProps {
  blocks: Array<EpochBlockData>
  current?: boolean
  epoch: string
  progress: string
  time: string
  tasks: string
  finishTime?: number
}

export interface EpochProps {
  completeBlockNumber: string
  id: string
  inclusionBlockNumber: string
  startBlockNumber: string
  startTime: string
  workers: any[]
  tasks: any[]
  gasUsed: string
  reward: string
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
  const { current = false, epoch: epochId, progress, time, blocks = [], tasks } = values
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
            <ValueAndSubtitle underlineValue={true} value={`#${epochId}`} subtitle="Epoch" />
            <ValueAndSubtitle value={tasks} subtitle="Tasks" />
          </TwoItemsGrid>
          <EpochBlockNumbers values={blocks} current={current} />
        </Values>
        <TimeLeftStyled current={current} value={time} />
      </EpochBlockStyled>
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
                value={`${epoch.workers.reduce((acc, { balance }) => (acc += +balance), 0)}`}
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
    </>
  )
}

export default withTheme(EpochBlock)
