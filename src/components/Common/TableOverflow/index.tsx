import React from 'react'
import styled from 'styled-components'

const TableOverflowWrapper = styled.div`
  overflow-x: auto;
  width: 100%;
`

const TableOverflow: React.FC = ({ children, ...restProps }) => {
  return <TableOverflowWrapper {...restProps}>{children}</TableOverflowWrapper>
}

export default TableOverflow
