import React from 'react'
import styled from 'styled-components'

export interface LinkTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  underline?: boolean
}

export const LinkText = styled.span<LinkTextProps>`
  cursor: ${props => (props.underline ? 'pointer' : 'default')};
  overflow: hidden;
  text-decoration: ${props => (props.underline ? 'underline' : 'none')};
  text-overflow: ellipsis;
  white-space: nowrap;
`
