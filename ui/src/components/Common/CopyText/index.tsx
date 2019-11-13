import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import styled from 'styled-components'
import { CopyIcon } from './img/CopyIcon'

interface CopyTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string
  text: string
}

const CopyWrapper = styled.span`
  background-color: transparent;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  outline: none;
  padding: 0;

  &:active {
    opacity: 0.5;
  }
`

const CopyText = (props: CopyTextProps) => {
  const { text, color, ...restProps } = props

  return (
    <CopyToClipboard options={{ message: 'Copied!', format: 'text/plain' }} text={text}>
      <CopyWrapper {...restProps}>
        <CopyIcon color={color} />
      </CopyWrapper>
    </CopyToClipboard>
  )
}

export default CopyText
