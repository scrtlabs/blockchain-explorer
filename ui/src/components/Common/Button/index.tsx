import React, { ReactNode, HTMLAttributes } from 'react'
import styled, { withTheme, css } from 'styled-components'
import { darken } from 'polished'

export const ButtonCSS = css<{ backgroundColor?: string }>`
  align-items: center;
  background-color: ${props => props.backgroundColor || '#d07676'};
  border-radius: 3px;
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  height: 38px;
  justify-content: center;
  outline: none;
  padding: 0 14px;
  text-transform: uppercase;
  transition: background-color 0.1s ease-out;
  white-space: nowrap;

  &:hover {
    background-color: ${props => darken(0.15, props.backgroundColor || '#d07676')};
  }

  &[disabled] {
    background-color: ${props => props.backgroundColor};
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const ButtonContainer = styled.button<{ backgroundColor: string }>`
  ${ButtonCSS}
`

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string
  children: ReactNode
  disabled?: boolean
  onClick?: (e?: any) => void
  type?: 'button' | 'submit' | 'reset' | undefined
  theme?: any
}

const ButtonComponent: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { backgroundColor, theme, children, disabled = false, onClick, ...restProps } = props

  return (
    <ButtonContainer
      backgroundColor={backgroundColor ? backgroundColor : theme.colors.primary}
      disabled={disabled}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </ButtonContainer>
  )
}

export const Button = withTheme(ButtonComponent)
