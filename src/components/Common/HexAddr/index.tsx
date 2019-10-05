import React from 'react'
import shrinkHexString from '../../../utils/shrinkHexString'

interface HexAddrProps extends React.HTMLAttributes<string> {
  start?: number
  end?: number
}

const HexAddr = ({ start = 5, end = 5, children }: HexAddrProps) => {
  if (typeof children !== 'string') {
    throw new Error('children must be a string')
  }

  return <>{shrinkHexString(children, start, end)}</>
}

export default HexAddr
