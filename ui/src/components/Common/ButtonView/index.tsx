import React from 'react'
import { Button, ButtonProps } from '../Button'
import styled from 'styled-components'
import EyeIcon from './img/eye.svg'

const ButtonStyled = styled(Button)``

const EyeImg = styled.img`
  margin-left: 10px;
`

export const ButtonView: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { backgroundColor = '#1576ad', children, disabled, onClick, ...restProps } = props

  return (
    <ButtonStyled backgroundColor={backgroundColor} disabled={disabled} onClick={onClick} {...restProps}>
      {children} <EyeImg src={EyeIcon} alt="" />
    </ButtonStyled>
  )
}
