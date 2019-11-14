import React from 'react'
import { render, fireEvent } from '../../../utils/test-utils'
import TableSearch from './'

it(`should render TableSearch without crashing`, () => {
  // Given
  const onRequestSearch = jest.fn()
  const onClearSearch = jest.fn()
  const placeholder = 'search what you need'
  const id = 'anId'

  // When
  const { container } = render(
    <TableSearch onRequestSearch={onRequestSearch} onClearSearch={onClearSearch} placeholder={placeholder} id={id} />,
  )

  // Then
  expect(container).toMatchSnapshot()
})

it(`should update search on every keypress`, () => {
  // Given
  const onRequestSearch = jest.fn()
  const onClearSearch = jest.fn()
  const placeholder = 'search what you need'
  const id = 'anId'
  const realTimeSearch = true

  // When
  const { getByRole } = render(
    <TableSearch
      onRequestSearch={onRequestSearch}
      onClearSearch={onClearSearch}
      placeholder={placeholder}
      id={id}
      realTimeSearch={realTimeSearch}
    />,
  )
  const searchInput = getByRole('textbox')
  fireEvent.change(searchInput, { target: { value: 'abc' } })

  // Then
  expect(onRequestSearch).toHaveBeenCalledWith('abc')
})

it(`should update clean the input field`, () => {
  // Given
  const onRequestSearch = jest.fn()
  const onClearSearch = jest.fn()
  const placeholder = 'search what you need'
  const id = 'anId'
  const realTimeSearch = true

  // When
  const { getAllByRole, getByRole } = render(
    <TableSearch
      onRequestSearch={onRequestSearch}
      onClearSearch={onClearSearch}
      placeholder={placeholder}
      id={id}
      realTimeSearch={realTimeSearch}
    />,
  )
  const searchInput = getByRole('textbox')
  fireEvent.change(searchInput, { target: { value: 'abc' } })
  expect(searchInput).toHaveValue('abc')

  // Then
  const clearButton = getAllByRole('button')[1]
  fireEvent.click(clearButton)
  expect(onClearSearch).toHaveBeenCalledTimes(1)
  expect(searchInput).toHaveValue('')
})

it(`should call onRequestSearch when submitting form`, () => {
  // Given
  console.error = jest.fn()
  const onRequestSearch = jest.fn()
  const onClearSearch = jest.fn()
  const placeholder = 'search what you need'
  const id = 'anId'
  const realTimeSearch = false

  // When
  const { getAllByRole, getByRole } = render(
    <TableSearch
      onRequestSearch={onRequestSearch}
      onClearSearch={onClearSearch}
      placeholder={placeholder}
      id={id}
      realTimeSearch={realTimeSearch}
    />,
  )
  const searchInput = getByRole('textbox')
  fireEvent.change(searchInput, { target: { value: 'abc' } })
  expect(onRequestSearch).toHaveBeenCalledTimes(0)

  // Then
  const searchButton = getAllByRole('button')[0]
  fireEvent.click(searchButton)
  expect(onRequestSearch).toHaveBeenCalledWith('abc')
})
