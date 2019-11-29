import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

export const ValueAndSubtitleStyled = styled.div``

export const Subtitle = styled.h3`
  color: ${props => props.theme.colors.textLight};
  font-size: 14px;
  font-weight: normal;
  line-height: 1.4;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
`

export const Value = styled.p<{ underline?: boolean }>`
  color: ${props => props.theme.colors.textCommon};
  cursor: ${props => props.underline ? 'pointer' : 'default'};
  display: block;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
  overflow: hidden;
  text-align: center;
  text-decoration: ${props => props.underline ? 'underline' : 'none'};
  text-overflow: ellipsis;
  white-space: nowrap;
`

export interface ValueAndSubtitleProps extends HTMLAttributes<HTMLDivElement> {
  subtitle: string
  underlineValue?: boolean
  value: string
}

const ValueAndSubtitle: React.FC<ValueAndSubtitleProps> = (props: ValueAndSubtitleProps) => {
  const { value, subtitle, underlineValue, ...restProps } = props

  return (
    <ValueAndSubtitleStyled {...restProps}>
      <Value underline={underlineValue}>{value}</Value>
      <Subtitle>{subtitle}</Subtitle>
    </ValueAndSubtitleStyled>
  )
}

export default ValueAndSubtitle
