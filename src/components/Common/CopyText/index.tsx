import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import styled from 'styled-components'
import Copy from './img/copy.svg'

interface CopyTextProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const CopyWrapper = styled.button`
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

const CopyText = ({ value }: CopyTextProps) => (
  <CopyWrapper>
    <CopyToClipboard text={value}>
      <img src={Copy} alt="" />
    </CopyToClipboard>
  </CopyWrapper>
)

export default CopyText
