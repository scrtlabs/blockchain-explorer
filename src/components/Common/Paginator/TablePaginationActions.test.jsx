import React from 'react'
import { render, fireEvent } from '../../../utils/test-utils'
import TablePaginationActions from './TablePaginationActions'

it(`should render TablePaginationActions without crashing`, () => {
  // Given
  const count = 60
  const page = 0
  const rowsPerPage = 10
  const onChangePage = jest.fn()

  // When
  const { container, getAllByRole } = render(
    <TablePaginationActions count={count} page={page} rowsPerPage={rowsPerPage} onChangePage={onChangePage} />,
  )
  const buttons = getAllByRole('button')

  // Then
  expect(buttons[0]).toHaveClass('Mui-disabled')
  expect(buttons[1]).toHaveClass('Mui-disabled')
  expect(container).toMatchSnapshot()
})

it(`should only call callback when action is available starting with first page`, () => {
  // Given
  const count = 60
  const page = 0
  const rowsPerPage = 10
  const onChangePage = jest.fn()

  // When
  const { getAllByRole } = render(
    <TablePaginationActions count={count} page={page} rowsPerPage={rowsPerPage} onChangePage={onChangePage} />,
  )
  const buttons = getAllByRole('button')

  // Then
  fireEvent.click(buttons[2])
  expect(onChangePage).toHaveBeenCalledWith(1)
  fireEvent.click(buttons[3])
  expect(onChangePage).toHaveBeenCalledWith(5)
})

it(`should only call callback when action is available starting with last page`, () => {
  // Given
  const count = 60
  const page = 5
  const rowsPerPage = 10
  const onChangePage = jest.fn()

  // When
  const { getAllByRole } = render(
    <TablePaginationActions count={count} page={page} rowsPerPage={rowsPerPage} onChangePage={onChangePage} />,
  )
  const buttons = getAllByRole('button')

  // Then
  fireEvent.click(buttons[1])
  expect(onChangePage).toHaveBeenCalledWith(4)
  fireEvent.click(buttons[0])
  expect(onChangePage).toHaveBeenCalledWith(0)
})
