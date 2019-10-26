import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import styled from 'styled-components'

export enum FlexAlign {
  'flexStart' = 'flex-start',
  'flexEnd' = 'flex-end',
  'center' = 'center',
}

export type HeaderCell = {
  id: string
  useClassShowOnDesktop: boolean
  align: FlexAlign
  label: string
  sortable: boolean
}

export interface EnhancedTableHeadProps extends React.HTMLAttributes<HTMLDivElement> {
  headerCells: HeaderCell[]
  order: 'asc' | 'desc'
  orderBy: string
  onRequestSort: CallableFunction
}

const TableHeadText = styled.span`
  color: #999;
  font-size: 12px;
  white-space: nowrap;

  & + svg {
    opacity: 1;
  }
`

const theme = createMuiTheme({
  overrides: {
    MuiTableSortLabel: {
      icon: {
        color: 'rgba(0, 0, 0, 0.3)',
      },
      active: {
        color: 'rgba(0, 0, 0, 0.7)',
      },
    },
  },
})

const EnhancedTableHead = ({ headerCells, order, orderBy, onRequestSort }: EnhancedTableHeadProps) => {
  const createSortHandler = (property: string) => (event: React.SyntheticEvent) => {
    onRequestSort(event, property)
  }

  return (
    <ThemeProvider theme={theme}>
      <TableHead>
        <TableRow>
          {headerCells.map(headerCell => {
            const active = orderBy === headerCell.id

            return (
              <TableCell
                key={headerCell.id}
                sortDirection={active ? order : false}
                className={headerCell.useClassShowOnDesktop ? 'showOnDesktop' : ''}
                style={{
                  paddingRight: '5px',
                  display: headerCell.useClassShowOnDesktop ? 'none' : 'table-cell',
                }}
              >
                {active ? (
                  <TableSortLabel
                    active={active}
                    direction={order}
                    onClick={createSortHandler(headerCell.id)}
                    style={{ justifyContent: headerCell.align, display: 'flex', cursor: 'pointer' }}
                  >
                    <TableHeadText>{headerCell.label}</TableHeadText>
                  </TableSortLabel>
                ) : (
                  <TableSortLabel
                    direction="asc"
                    hideSortIcon={!headerCell.sortable}
                    onClick={headerCell.sortable ? createSortHandler(headerCell.id) : () => {}}
                    style={{
                      justifyContent: headerCell.align,
                      display: 'flex',
                      cursor: headerCell.sortable ? 'pointer' : 'default',
                    }}
                  >
                    <TableHeadText>{headerCell.label}</TableHeadText>
                  </TableSortLabel>
                )}
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
    </ThemeProvider>
  )
}

export default EnhancedTableHead
