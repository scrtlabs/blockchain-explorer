import React, { createRef } from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { FilterSVG } from './img/FilterSVG'
import FilterItem from '../FilterItem'
import { Button } from '../Button'
import styled from 'styled-components'

export enum FlexAlign {
  'center' = 'center',
  'end' = 'flex-end',
  'start' = 'flex-start',
}

export type FilterOption = {
  title: string
  value: string
}

export type HeaderCell = {
  align: FlexAlign
  id: string
  label: string
  filter?: boolean
  filterOptions?: FilterOption[]
  sortable: boolean
  useClassShowOnDesktop: boolean
}

export interface EnhancedTableHeadProps extends React.HTMLAttributes<HTMLDivElement> {
  headerCells: HeaderCell[]
  order: 'asc' | 'desc'
  orderBy: string
  onRequestSort: CallableFunction
  onRequestFilter?: CallableFunction
  filteredDataSet?: boolean
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

const FilterWrapper = styled.div<{ active?: boolean }>`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 0 0 0 5px;
  outline: none;
  padding: 0;
  position: relative;

  > svg {
    fill: ${COLOR_DEFAULT};
  }

  &:focus-within {
    > div {
      display: block;
    }

    > svg {
      fill: ${COLOR_ACTIVE};
    }
  }
`

const FilterDropdown = styled.div`
  background-color: #fff;
  border-radius: 3px;
  border: solid 1px ${props => props.theme.borders.borderColor};
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.02);
  display: none;
  left: 50%;
  position: absolute;
  top: calc(100% + 10px);
  transform: translateX(-50%);
  width: 125px;

  &::before {
    border-bottom: 5px solid #fff;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    content: '';
    height: 5px;
    left: 50%;
    position: absolute;
    top: -5px;
    transform: translateX(-50%);
    width: 5px;
    z-index: 5;
  }

  &::after {
    border-bottom: 7px solid ${props => props.theme.borders.borderColor};
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    content: '';
    height: 7px;
    left: 50%;
    position: absolute;
    top: -7px;
    transform: translateX(-50%);
    width: 7px;
    z-index: 1;
  }
`

const FilterButtonContainer = styled.span`
  display: flex;
  padding: 6px 8px;
`

const HelperFocusItem = styled.span`
  height: 0;
  line-height: 0;
  width: 0;
  position: absolute;
  z-index: -123456;
`

const ButtonStyled = styled(Button)`
  border-radius: 2px;
  flex-grow: 1;
  font-size: 12px;
  font-weight: 600;
  height: 22px;
  line-height: 22px;
  text-transform: uppercase;
`

export type TableFilterProps = {
  options?: FilterOption[]
  myRef: any
  applyFilter: Function
  item: string
}

const TableFilter = ({ options, myRef, applyFilter, item }: TableFilterProps) => {
  options = options || []
  const [optionsSelection, setOptionsSelection] = React.useState(
    options.reduce((acc: { [index: string]: boolean }, { value }) => {
      acc[value] = false
      return acc
    }, {}),
  )

  const onChangeFilterItem = (item: string, isChecked: boolean) => {
    setOptionsSelection(prevState => ({ ...prevState, [item]: isChecked }))
  }

  return (
    <>
      <HelperFocusItem tabIndex={-1} ref={myRef} />
      <FilterWrapper tabIndex={-1}>
        <FilterSVG />
        <FilterDropdown>
          {options &&
            options.map(({ title, value }) => (
              <FilterItem onChange={onChangeFilterItem} text={title} value={value} key={value} />
            ))}
          <FilterButtonContainer>
            <ButtonStyled onClick={() => applyFilter(optionsSelection, item)} backgroundColor="#e72e9d">
              Apply
            </ButtonStyled>
          </FilterButtonContainer>
        </FilterDropdown>
      </FilterWrapper>
    </>
  )
}

const EnhancedTableHead = ({
  headerCells,
  order,
  orderBy,
  onRequestSort,
  onRequestFilter,
  filteredDataSet,
}: EnhancedTableHeadProps) => {
  const createSortHandler = (property: string) => (event: React.SyntheticEvent) => {
    onRequestSort(event, property)
  }

  const myRef = createRef<HTMLDivElement>()

  const applyFilter = (optionsSelection: { [index: string]: boolean }, item: string) => {
    // apply filter
    const selectedOptions = Object.keys(optionsSelection).filter(k => optionsSelection[k])
    onRequestFilter && onRequestFilter(item, selectedOptions)

    // close dropdown
    if (myRef.current) {
      myRef.current.focus()
    }
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
                  <TableFilter
                    myRef={myRef}
                    options={headerCell.filterOptions}
                    item={headerCell.id}
                    applyFilter={applyFilter}
                  />
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
