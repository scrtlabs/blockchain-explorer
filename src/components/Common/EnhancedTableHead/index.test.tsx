import React from 'react'
import { render, fireEvent } from '../../../utils/test-utils'
import EnhancedTableHead, { HeaderCell } from './'
import Table from '@material-ui/core/Table'

const HEADER_CELLS: HeaderCell[] = [
  { id: '_id', useClassShowOnDesktop: false, align: 'flex-start', label: 'Task ID' },
  { id: 'scAddr', useClassShowOnDesktop: true, align: 'flex-start', label: 'Secret Contact Address' },
  { id: 'workerAddress', useClassShowOnDesktop: true, align: 'flex-start', label: 'Worker Address (Ethereum)' },
  { id: 'status', useClassShowOnDesktop: false, align: 'center', label: 'Status' },
  { id: 'sentOn', useClassShowOnDesktop: true, align: 'center', label: 'Sent On' },
  { id: 'completedOn', useClassShowOnDesktop: true, align: 'center', label: 'Completed On' },
]

it('renders EnhancedTableHead', () => {
  // Given
  const headerCells = HEADER_CELLS
  const order = 'asc'
  const orderBy = 'status'
  const onRequestSort = jest.fn()

  // When
  const { container } = render(
    <Table>
      <EnhancedTableHead headerCells={headerCells} order={order} orderBy={orderBy} onRequestSort={onRequestSort} />
    </Table>,
  )

  // Then
  expect(container).toMatchSnapshot()
})

it('renders EnhancedTableHead without title', () => {
  // Given
  const headerCells = HEADER_CELLS
  const order = 'asc'
  const orderBy = 'status'
  const onRequestSort = jest.fn()

  // When
  const { getByText } = render(
    <Table>
      <EnhancedTableHead headerCells={headerCells} order={order} orderBy={orderBy} onRequestSort={onRequestSort} />
    </Table>,
  )
  const byText = getByText(/completed on/i)
  fireEvent.click(byText)

  // Then
  expect(onRequestSort).toHaveBeenCalled()
})
