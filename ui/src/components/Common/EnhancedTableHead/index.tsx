import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { FilterSVG } from './img/FilterSVG'
import styled from 'styled-components'

export enum FlexAlign {
  'center' = 'center',
  'end' = 'flex-end',
  'start' = 'flex-start',
}

export type HeaderCell = {
  align: FlexAlign
  id: string
  label: string
  filter?: boolean
  sortable: boolean
  useClassShowOnDesktop: boolean
}

export interface EnhancedTableHeadProps extends React.HTMLAttributes<HTMLDivElement> {
  headerCells: HeaderCell[]
  order: 'asc' | 'desc'
  orderBy: string
  onRequestSort: CallableFunction
}

const COLOR_DEFAULT = '#999'
const COLOR_ACTIVE = '#333'

const TableHeadWrapper = styled.span<{ alignElements?: string }>`
  align-items: center;
  display: flex;
  justify-content: ${props => (props.alignElements ? props.alignElements : 'flex-start')};
`

const TableHeadText = styled.span<{ active?: boolean }>`
  color: ${props => (props.active ? COLOR_ACTIVE : COLOR_DEFAULT)};
  font-size: 12px;
  white-space: nowrap;
`

const FilterWrapper = styled.span<{ active?: boolean }>`
  cursor: pointer;
  fill: ${props => (props.active ? COLOR_ACTIVE : COLOR_DEFAULT)};
  margin-left: 5px;
`

const EnhancedTableHead = ({ headerCells, order, orderBy, onRequestSort }: EnhancedTableHeadProps) => {
  const createSortHandler = (property: string) => (event: React.SyntheticEvent) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headerCells.map(headerCell => {
          const activeSorting = orderBy === headerCell.id
          const sortProps: any = {
            direction: activeSorting ? 'asc' : 'desc',
            onClick: createSortHandler(headerCell.id),
            style: {
              cursor: 'pointer',
              fill: activeSorting ? COLOR_ACTIVE : COLOR_DEFAULT,
              height: '16px',
              marginLeft: '8px',
              transform: order === 'desc' ? 'rotate(180deg)' : '',
              width: '16px',
            },
          }

          return (
            <TableCell
              className={headerCell.useClassShowOnDesktop ? 'showOnDesktop' : ''}
              key={headerCell.id}
              style={{
                display: headerCell.useClassShowOnDesktop ? 'none' : 'table-cell',
                paddingRight: '5px',
              }}
            >
              <TableHeadWrapper alignElements={headerCell.align}>
                <TableHeadText active={activeSorting}>{headerCell.label}</TableHeadText>
                {headerCell.sortable ? <ArrowDownwardIcon {...sortProps} /> : null}
                {headerCell.filter ? (
                  <FilterWrapper>
                    <FilterSVG />
                  </FilterWrapper>
                ) : null}
              </TableHeadWrapper>
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
