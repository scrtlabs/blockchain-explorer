import React from 'react'

interface LocaleDateProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const LocaleDate = ({ children }: LocaleDateProps) => {
  if (!children) {
    return null
  }

  if (typeof children !== 'string') {
    throw new Error('children must be a string')
  }

  return <>{new Date(children).toLocaleString()}</>
}

export default LocaleDate
