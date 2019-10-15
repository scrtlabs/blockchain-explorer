import React from 'react'
import { render } from '../../../utils/test-utils'
import Paginator from './'

it(`should render Paginator without crashing`, () => {
  // Given
  const colSpan = 4
  const count = 60
  const page = 0
  const rowsPerPage = 10
  const onChangePage = jest.fn()

  // When
  const { container } = render(
    <Paginator colSpan={colSpan} count={count} page={page} rowsPerPage={rowsPerPage} onChangePage={onChangePage} />,
  )

  // Then
  expect(container).toMatchSnapshot()
})
