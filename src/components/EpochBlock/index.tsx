import React, { HTMLAttributes } from 'react'
import styled, { withTheme } from 'styled-components'
import Card from '../Common/Card'
import ValueAndSubtitle from '../Common/ValueAndSubtitle'
import ProgressCircle from '../ProgressCircle'

const EpochBlockStyled = styled(Card)<BlockProps>`
  padding: 19px 15px 12px;
  position: relative;

  &::before {
    background-color: ${props => props.borderColor};
    border-top-left-radius: ${props => props.theme.cards.borderRadius};
    border-top-right-radius: ${props => props.theme.cards.borderRadius};
    content: '';
    height: 6px;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  > div {
    flex-direction: row;
  }
`

const ProgressCircleStyled = styled(ProgressCircle)`
  flex-shrink: 0;
  margin-right: 15px;
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

export interface ValuesProps {
  current?: boolean
  epoch: string
  progress: string
  tasks: string
  time: string
}

interface EpochProps extends HTMLAttributes<HTMLDivElement> {
  values: ValuesProps
  theme: any
}

interface BlockProps extends HTMLAttributes<HTMLDivElement> {
  borderColor?: string
}

const EpochBlock: React.FC<EpochProps> = (props: EpochProps) => {
  const { values, theme, ...restProps } = props
  const { current, epoch, progress, tasks, time } = values
  const timeLabel: string = current ? 'Time Left' : 'Ended'
  const endedColor: string = 'rgba(28, 168, 248, 0.5)'
  const runningColor: string = 'rgba(231, 46, 157, 0.6)'
  const borderColor: string = current ? theme.colors.secondary : endedColor

  return (
    <EpochBlockStyled borderColor={borderColor} {...restProps}>
      <ProgressCircleStyled color={current ? runningColor : endedColor} title="Completed Tasks" progress={progress} />
      <Values>
        <TwoItemsGrid>
          <ValueAndSubtitle value={`#${epoch}`} subtitle="Epoch" />
          <ValueAndSubtitle value={tasks} subtitle="Tasks" />
        </TwoItemsGrid>
        <ValueAndSubtitle value={time} subtitle={timeLabel} />
      </Values>
    </EpochBlockStyled>
  )
}

export default withTheme(EpochBlock)
