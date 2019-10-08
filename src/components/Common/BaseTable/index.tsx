import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { TablePaginationProps } from '@material-ui/core/TablePagination'
import styled from 'styled-components'
import EnhancedTableHead, { EnhancedTableHeadProps } from '../EnhancedTableHead'
import Paginator from '../Paginator'
import Card from '../Card'
import TableOverflow from '../TableOverflow'
import ChevronOpen from './img/chevron-open.svg'
import ChevronClosed from './img/chevron-closed.svg'

type CellProps = {
  id: string
  align: 'left' | 'right' | 'center'
  value: React.ReactNode | string
  status?: 'success' | 'submitted' | 'error'
  colSpan?: number
  style?: object
  onClick?: CallableFunction
}

export type RowProps = {
  id: string
  style?: object
  onClick?: CallableFunction
  cells: CellProps[]
}

export interface BaseTableProps extends React.HTMLAttributes<HTMLDivElement> {
  headerProps?: EnhancedTableHeadProps
  rows: RowProps[]
  paginatorProps?: TablePaginationProps
}

const CardStyled = styled(Card)`
  padding: 0 0 5px 0;
`

const TableCellContent = styled.div`
  display: flex;
`

const TableCellText = styled.span<{ status?: 'success' | 'submitted' | 'error' }>`
  color: ${props => props.theme.status[props.status || 'submitted']};
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

const BaseTable = ({ headerProps, rows, paginatorProps }: BaseTableProps) => (
  <CardStyled>
    <TableOverflow>
      <Table>
        {headerProps && <EnhancedTableHead {...headerProps} />}
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id} style={row.style} onClick={() => row.onClick && row.onClick()}>
              {row.cells.map(cell => (
                <TableCell
                  style={{ paddingRight: '16px', ...cell.style }}
                  align={cell.align}
                  key={cell.id}
                  colSpan={cell.colSpan}
                  onClick={() => cell.onClick && cell.onClick()}
                >
                  <TableCellContent>
                    <TableCellText status={cell.status}>{cell.value}</TableCellText>
                  </TableCellContent>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableOverflow>
    {paginatorProps && <Paginator {...paginatorProps} />}
  </CardStyled>
)

export default BaseTable
