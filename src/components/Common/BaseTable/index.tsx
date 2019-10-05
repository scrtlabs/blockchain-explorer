import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import { TablePaginationProps } from '@material-ui/core/TablePagination'
import styled from 'styled-components'
import EnhancedTableHead, { EnhancedTableHeadProps } from '../EnhancedTableHead'
import Paginator from '../Paginator'
import Card from '../Card'
import TableOverflow from '../TableOverflow'
import ChevronOpen from './img/chevron-open.svg'
import ChevronClosed from './img/chevron-closed.svg'

interface BaseTableProps extends React.HTMLAttributes<HTMLDivElement> {
  headProps: EnhancedTableHeadProps
  body: []
  paginatorProps?: TablePaginationProps
}

const CardStyled = styled(Card)`
  padding: 0 0 5px 0;
`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TableCellContent = styled.div`
  display: flex;
`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TableCellText = styled.span<{ error: boolean }>`
  color: ${props => (props.error ? '#f40000' : '#000')};
  font-size: 13px;
  font-weight: normal;
  line-height: 1.2;
  white-space: nowrap;
`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Chevron = styled.div<{ isOpen: boolean }>`
  background-image: url(${props => (props.isOpen ? ChevronOpen : ChevronClosed)});
  background-position: 0 50%;
  background-repeat: no-repeat;
  height: 12px;
  margin: 0 12px 0 0;
  transition: all 0.15s linear;
  width: 12px;
`

const BaseTable = ({ headProps, body, paginatorProps }: BaseTableProps) => (
  <CardStyled>
    <TableOverflow>
      <Table>
        <EnhancedTableHead {...headProps} />
        <TableBody>{body}</TableBody>
      </Table>
    </TableOverflow>
    {paginatorProps && <Paginator {...paginatorProps} />}
  </CardStyled>
)

export default BaseTable
