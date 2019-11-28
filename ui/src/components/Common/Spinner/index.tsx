import React from 'react'
import styled, { keyframes } from 'styled-components'
import SpinnerSVG from './img/spinner.svg'

type RotatingSpinnerProps = {
  width?: string
  height?: string
  whiteBackground?: boolean
}

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement>, RotatingSpinnerProps {}

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

const SpinnerIcon = styled.img<{ whiteBackground?: boolean }>`
  height: 100%;
  width: 100%;
  filter: ${props => (props.whiteBackground ? 'opacity(0.6) brightness(0.7) invert(0.8)' : 'none')};
`

const Spinner = ({ width, height, whiteBackground, ...restProps }: SpinnerProps) => {
  return (
    <RotatingSpinner width={width} height={height} {...restProps}>
      <SpinnerIcon whiteBackground={whiteBackground} src={SpinnerSVG} alt="" />
    </RotatingSpinner>
  )
}

export default Spinner
