import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { Time } from './img/Time'
import { Lock } from './img/Lock'

const TimeleftWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  > svg {
    margin-right: 3px;
  }
`

const Value = styled.span<{ current: boolean }>`
  font-size: 10px;
  font-weight: 600;
  color: ${props => (props.current ? props.theme.colors.textCommon : props.theme.colors.textLight)};
`

interface ValueProps {
  current: boolean
  value: string
}

interface TimeLeftProps extends HTMLAttributes<HTMLDivElement>, ValueProps {}

const TimeLeft: React.FC<TimeLeftProps> = (props: TimeLeftProps) => {
  const { value, current, ...restProps } = props
  const valueIcon = current ? <Time /> : <Lock />
  const valueLabel = current ? ' left' : ' ago'

  return (
    <TimeleftWrapper {...restProps}>
      {valueIcon}
      <Value current={current}>
        {value}
        {valueLabel}
      </Value>
    </TimeleftWrapper>
  )
}

export default TimeLeft
