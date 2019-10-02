import React from 'react'
import styled, { keyframes } from 'styled-components'
import SpinnerSVG from './img/spinner.svg'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const RotatingSpinner = styled.div<{ height: string; width: string }>`
  animation: ${rotate} 4s linear infinite;
  height: ${props => props.height};
  width: ${props => props.width};
`

const SpinnerIcon = styled.img`
  height: 100%;
  width: 100%;
`

const Spinner = (props: { width?: string; height?: string; color?: string }) => {
  const { width = '40px', height = '40px', color = '#fff', ...restProps } = props

  return (
    <RotatingSpinner width={width} height={height} color={color} {...restProps}>
      <SpinnerIcon src={SpinnerSVG} alt="" />
    </RotatingSpinner>
  )
}

export default Spinner
