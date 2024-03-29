import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { TablePaginationProps } from '@material-ui/core/TablePagination'
import styled, { withTheme } from 'styled-components'
import EnhancedTableHead, { EnhancedTableHeadProps, FlexAlign } from '../EnhancedTableHead'
import Paginator from '../Paginator'
import Card from '../Card'
import TableOverflow from '../TableOverflow'
import ContainedLoading from '../ContainedLoading'

export enum CellStatuses {
  success = 'success',
  submitted = 'submitted',
  error = 'error',
  normal = 'textCommon',
}

type CellProps = {
  id: string
  align: FlexAlign
  useClassShowOnDesktop?: boolean
  value: React.ReactNode | string
  status?: CellStatuses
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
  loading?: boolean
  theme: any
}

const CardStyled = styled(Card)`
  padding: 0 0 5px 0;
  position: relative;
`

const TableCellContent = styled.div<{ align?: string }>`
  justify-content: ${props => (props.align ? props.align : 'center')};
  display: flex;
`

const TableCellText = styled.span<{ status?: CellStatuses }>`
  color: ${props => (props.status && props.theme.status[props.status]) || props.theme.colors[CellStatuses.normal]};
  font-size: 13px;
  font-weight: normal;
  line-height: 1.2;
  white-space: nowrap;
`

const BaseTable: React.FC<BaseTableProps> = ({ headerProps, rows = [], paginatorProps, loading = false, theme }) => (
  <CardStyled>
    <TableOverflow>
      <Table>
        {headerProps && <EnhancedTableHead {...headerProps} />}
        <TableBody>
          {!loading && !rows.length && (
            <TableRow>
              <TableCell colSpan={50} align="center" style={{ color: theme.colors.textLight, fontStyle: 'italic' }}>
                no data
              </TableCell>
            </TableRow>
          )}
          {rows.map(row => (
            <TableRow key={row.id} style={row.style} onClick={() => row.onClick && row.onClick()}>
              {row.cells.map(cell => (
                <TableCell
                  className={cell.useClassShowOnDesktop ? 'showOnDesktop' : ''}
                  style={{
                    paddingRight: '16px',
                    ...cell.style,
                    display: cell.useClassShowOnDesktop ? 'none' : 'table-cell',
                  }}
                  key={cell.id}
                  colSpan={cell.colSpan}
                  onClick={() => cell.onClick && cell.onClick()}
                >
                  <TableCellContent align={cell.align}>
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
    {loading && <ContainedLoading />}
  </CardStyled>
)

export default withTheme(BaseTable)
