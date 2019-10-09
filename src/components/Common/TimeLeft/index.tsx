import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { ValueAndSubtitleStyled, Subtitle, Value, ValueAndSubtitleProps } from '../ValueAndSubtitle'
import LockIcon from './img/lock.svg'
import TimeIcon from './img/time.svg'

const ValueStyled = styled(Value)<ValueProps>`
  align-items: center;
  color: ${props => (props.current ? props.theme.colors.textCommon : props.theme.colors.textLight)};
  display: flex;
  justify-content: center;

  > img {
    margin-right: 5px;
  }
`

const SubtitleStyled = styled(Subtitle)`
  color: ${props => props.theme.colors.textLight};
`

interface ValueProps {
  current: boolean
}

interface TimeLeftProps extends HTMLAttributes<HTMLDivElement>, ValueAndSubtitleProps, ValueProps {}

const TimeLeft: React.FC<TimeLeftProps> = (props: TimeLeftProps) => {
  const { value, subtitle, current, ...restProps } = props
  const valueIcon = current ? TimeIcon : LockIcon

  return (
    <ValueAndSubtitleStyled {...restProps}>
      <ValueStyled current={current}>
        <img src={valueIcon} alt="" />
        {value}
      </ValueStyled>
      <SubtitleStyled>{subtitle}</SubtitleStyled>
    </ValueAndSubtitleStyled>
  )
}

export default TimeLeft
