import React from 'react'
import { Button, ButtonProps } from '../Button'
import styled from 'styled-components'
import ExpandIcon from './img/expand.svg'

const ButtonStyled = styled(Button)``

const ExpandImg = styled.img`
  margin-left: 10px;
`

export const ButtonExpand: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { backgroundColor, children, disabled, onClick, ...restProps } = props

  return (
    <ButtonStyled backgroundColor={backgroundColor} disabled={disabled} onClick={onClick} {...restProps}>
      {children} <ExpandImg src={ExpandIcon} alt="" />
    </ButtonStyled>
  )
}
