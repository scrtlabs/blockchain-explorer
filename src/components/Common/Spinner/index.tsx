import React, { HTMLAttributes } from 'react'
import styled, { keyframes } from 'styled-components'
import SpinnerSVG from './img/spinner.svg'

type RotatingSpinnerProps = {
  width?: string
  height?: string
}

interface SpinnerProps extends HTMLAttributes<HTMLDivElement>, RotatingSpinnerProps {}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const RotatingSpinner = styled.div<RotatingSpinnerProps>`
  animation: ${rotate} 4s linear infinite;
  height: ${props => props.height};
  width: ${props => props.width};
`

RotatingSpinner.defaultProps = {
  width: '40px',
  height: '40px',
}

const SpinnerIcon = styled.img`
  height: 100%;
  width: 100%;
`

const Spinner = ({ width, height, ...restProps }: SpinnerProps) => {
  return (
    <RotatingSpinner width={width} height={height} {...restProps}>
      <SpinnerIcon src={SpinnerSVG} alt="" />
    </RotatingSpinner>
  )
}

export default Spinner
