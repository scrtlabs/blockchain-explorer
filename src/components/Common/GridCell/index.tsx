import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

export const GridCellStyled = styled.div``

export const Title = styled.h3`
  color: ${props => props.theme.colors.textCommon};
  font-size: 15px;
  font-weight: 600;
  line-height: 1.33;
  margin: 0 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
interface ValueProps extends HTMLAttributes<HTMLDivElement> {
  underline?: boolean
  color?: string
}

export const Value = styled.p<ValueProps>`
  color: ${props => (props.color ? props.color : props.theme.colors.textCommon)};
  cursor: ${props => (props.underline ? 'pointer' : 'default')};
  display: block;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  margin: 0;
  overflow: hidden;
  text-decoration: ${props => (props.underline ? 'underline' : 'none')};
  text-overflow: ellipsis;
  white-space: nowrap;
`

export interface ValueAndSubtitleProps extends HTMLAttributes<HTMLDivElement> {
  valueColor?: string
  title: string
  underlineValue?: boolean
  value: string
}

const GridCell: React.FC<ValueAndSubtitleProps> = (props: ValueAndSubtitleProps) => {
  const { value, title, underlineValue, valueColor, ...restProps } = props

  return (
    <GridCellStyled {...restProps}>
      <Title>{title}</Title>
      <Value underline={underlineValue} color={valueColor}>
        {value}
      </Value>
    </GridCellStyled>
  )
}

export default GridCell
