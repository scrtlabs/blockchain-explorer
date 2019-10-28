import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
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

const EnhancedTableHead = ({ headerCells, order, orderBy, onRequestSort }: EnhancedTableHeadProps) => {
  const createSortHandler = (property: string) => (event: React.SyntheticEvent) => {
    onRequestSort(event, property)
  }

  return (
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
                  hideSortIcon={false}
                  onClick={createSortHandler(headerCell.id)}
                  style={{
                    justifyContent: headerCell.align,
                    display: 'flex',
                  }}
                >
                  <TableHeadText>{headerCell.label}</TableHeadText>
                </TableSortLabel>
              ) : (
                <TableHeadText
                  onClick={createSortHandler(headerCell.id)}
                  style={{
                    justifyContent: headerCell.align,
                    display: 'flex',
                    cursor: 'pointer',
                  }}
                >
                  {headerCell.label}
                </TableHeadText>
              )}
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
