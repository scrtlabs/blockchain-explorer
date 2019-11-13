import React from 'react'
import { render } from '../../../utils/test-utils'
import SectionTitle from './'

it('renders SectionTitle with title', () => {
  // Given
  const title = 'This is My Title'

  // When
  const { getByRole } = render(<SectionTitle>{title}</SectionTitle>)

  // Then
  expect(getByRole('heading')).toHaveTextContent(title)
})

it('renders SectionTitle without title', () => {
  const { getByRole } = render(<SectionTitle />)
  expect(getByRole('heading')).toHaveTextContent('')
})

it('renders SectionTitle with title and right content', () => {
  // Given
  const title = 'This is My Title'
  const placeholder = 'search by something'
  const right = <input type="search" placeholder={placeholder} />

  // When
  const { getByRole, getByPlaceholderText } = render(<SectionTitle right={right}>{title}</SectionTitle>)

  // Then
  expect(getByRole('heading')).toHaveTextContent(title)
  expect(getByPlaceholderText(placeholder)).toBeInTheDocument()
})

it('renders SectionTitle with title and right content', () => {
  // Given
  const placeholder = 'search by something'
  const right = <input type="search" placeholder={placeholder} />

  // When
  const { getByRole, getByPlaceholderText } = render(<SectionTitle right={right} />)

  // Then
  expect(getByRole('heading')).toHaveTextContent('')
  expect(getByPlaceholderText(placeholder)).toBeInTheDocument()
})
