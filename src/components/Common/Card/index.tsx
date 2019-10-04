import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

type CardStyledProps = {
  noPadding: boolean
}

type TitleProps = {
  titleAlign: string
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  children: React.ReactNode
  noPadding: boolean
  titleAlign?: string
}

const CardStyled = styled.div<CardStyledProps>`
  background-color: ${props => props.theme.cards.backgroundColor};
  border-radius: ${props => props.theme.cards.borderRadius};
  border: ${props => props.theme.cards.border};
  box-shadow: ${props => props.theme.cards.boxShadow};
  display: flex;
  flex-direction: column;
  ${props =>
    props.noPadding
      ? 'padding: 0'
      : 'padding: ' + props.theme.cards.paddingVertical + ' ' + props.theme.cards.paddingHorizontal + ';'}
`

const Title = styled.h2<TitleProps>`
  color: ${props => props.theme.cards.titleColor};
  font-size: 16px;
  font-weight: 700;
  line-height: 1.31;
  margin: 0;
  text-align: ${props => props.titleAlign};
`

const Body = styled.div`
  color: ${props => props.theme.cards.textColor};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Card = ({ title, children, noPadding, titleAlign = 'left', ...restProps }: CardProps) => {
  return (
    <CardStyled noPadding={noPadding} {...restProps}>
      {title ? <Title titleAlign={titleAlign}>{title}</Title> : null}
      <Body>{children}</Body>
    </CardStyled>
  )
}

export default Card
