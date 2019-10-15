import React from 'react'
import { fireEvent, render } from '../../../utils/test-utils'
import EnhancedTableHead, { HeaderCell, HeaderCellAlign } from './'
import Table from '@material-ui/core/Table'

const HEADER_CELLS: HeaderCell[] = [
  { id: '_id', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'Task ID' },
  { id: 'scAddr', useClassShowOnDesktop: true, align: HeaderCellAlign.flexStart, label: 'Secret Contact Address' },
  {
    id: 'workerAddress',
    useClassShowOnDesktop: true,
    align: HeaderCellAlign.flexStart,
    label: 'Worker Address (Ethereum)',
  },
  { id: 'status', useClassShowOnDesktop: false, align: HeaderCellAlign.center, label: 'Status' },
  { id: 'sentOn', useClassShowOnDesktop: true, align: HeaderCellAlign.center, label: 'Sent On' },
  { id: 'completedOn', useClassShowOnDesktop: true, align: HeaderCellAlign.center, label: 'Completed On' },
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
