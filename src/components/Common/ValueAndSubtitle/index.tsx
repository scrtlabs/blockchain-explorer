import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

const ValueAndSubtitleStyled = styled.div``

const Subtitle = styled.h3`
  color: ${props => props.theme.colors.textLight};
  font-size: 14px;
  font-weight: normal;
  line-height: 1.4;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
`

const Value = styled.p`
  color: ${props => props.theme.colors.textCommon};
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  margin: 0;
  text-align: center;
`

interface Props extends HTMLAttributes<HTMLDivElement> {
  subtitle: string
  value: any
}

const ValueAndSubtitle: React.FC<Props> = (props: Props) => {
  const { value, subtitle, ...restProps } = props

  return (
    <ValueAndSubtitleStyled {...restProps}>
      <Value>{value}</Value>
      <Subtitle>{subtitle}</Subtitle>
    </ValueAndSubtitleStyled>
  )
}

export default ValueAndSubtitle
