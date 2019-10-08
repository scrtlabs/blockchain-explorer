import React from 'react'
import { render, fireEvent } from '../../../utils/test-utils'
import BaseTable, { RowProps } from './'
import { HeaderCell } from '../EnhancedTableHead'

const HEADER_CELLS: HeaderCell[] = [
  { id: '_id', useClassShowOnDesktop: false, align: 'flex-start', label: 'Task ID' },
  { id: 'scAddr', useClassShowOnDesktop: true, align: 'flex-start', label: 'Secret Contact Address' },
  { id: 'workerAddress', useClassShowOnDesktop: true, align: 'flex-start', label: 'Worker Address (Ethereum)' },
]

const ROWS: RowProps[] = [
  {
    id: 'firstRow',
    cells: [
      { id: 'firstCell-firstRow', align: 'center', status: 'success', value: 'first value at first row' },
      { id: 'secondCell-firstRow', align: 'left', status: 'error', value: 'second value at first row' },
      { id: 'thirdCell-firstRow', align: 'right', status: 'submitted', value: 'third value at first row' },
    ],
  },
  {
    id: 'secondRow',
    cells: [
      { id: 'firstCell-secondRow', align: 'center', status: 'success', value: 'first value at second row' },
      { id: 'secondCell-secondRow', align: 'left', status: 'error', value: 'second value at second row' },
      { id: 'thirdCell-secondRow', align: 'right', status: 'submitted', value: 'third value at second row' },
    ],
  },
  {
    id: 'thirdRow',
    cells: [
      { id: 'firstCell-thirdRow', align: 'center', status: 'success', value: 'first value at third row' },
      {
        id: 'thirdCell-thirdRow',
        align: 'right',
        status: 'submitted',
        value: 'third value at third row',
        colSpan: 2,
      },
    ],
  },
]

it(`should render BaseTable without crashing`, () => {
  // Given
  const rows = ROWS.map((row, rI) => {
    row.cells.map((cell, cI) => {
      if (rI === 2 && cI === 1) {
        cell.status = undefined // testing default status property
      }
      return cell
    })

    return row
  })

  // When
  const { container } = render(<BaseTable rows={rows} />)

  // Then
  expect(container).toMatchSnapshot()
})

it(`should render BaseTable with header and footer`, () => {
  // Given
  const headerCells = HEADER_CELLS
  const rows = ROWS

  // When
  const { container } = render(
    <BaseTable
      headerProps={{
        headerCells,
        order: 'asc',
        orderBy: 'id',
        onRequestSort: jest.fn(),
      }}
      rows={rows}
      paginatorProps={{
        colSpan: headerCells.length,
        count: rows.length,
        page: 0,
        rowsPerPage: 1,
        onChangePage: jest.fn(),
      }}
    />,
  )

  // Then
  expect(container).toMatchSnapshot()
})

it(`should render call callbacks in cells`, () => {
  // Given
  const cellCallback = jest.fn()
  const rows = ROWS.map((row, rI) => {
    row.cells.map((cell, cI) => {
      if (rI === 0 && cI === 0) {
        cell.onClick = cellCallback
      }
      return cell
    })

    return row
  })

  // When
  const { getByText } = render(<BaseTable rows={rows} />)
  fireEvent.click(getByText('first value at first row'))

  // Then
  expect(cellCallback).toHaveBeenCalled()
})

it(`should render call callbacks in rows`, () => {
  // Given
  const rowCallback = jest.fn()
  const rows = ROWS.map((row, rI) => {
    if (rI === 0) {
      row.onClick = rowCallback
    }

    return row
  })

  // When
  const { getByText } = render(<BaseTable rows={rows} />)
  fireEvent.click(getByText('first value at first row'))

  // Then
  expect(rowCallback).toHaveBeenCalled()
})
