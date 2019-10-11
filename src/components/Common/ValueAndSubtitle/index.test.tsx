import React from 'react'
import { render } from '../../../utils/test-utils'
import ValueAndSubtitle from './'

it('renders ValueAndSubtitle with value not underlined', () => {
  // Given
  const value = 'this is a message'
  const subtitle = 'and a subtitle'

  // When
  const { getByText, getByRole } = render(<ValueAndSubtitle value={value} subtitle={subtitle} />)

  // Then
  expect(getByText(value)).toHaveStyleRule('text-decoration', 'none')
  expect(getByRole('heading')).toHaveTextContent(subtitle)
})

it('renders ValueAndSubtitle with value underlined', () => {
  // Given
  const value = 'this is a message'
  const subtitle = 'and a subtitle'

  // When
  const { getByText, getByRole } = render(<ValueAndSubtitle underlineValue={true} value={value} subtitle={subtitle} />)

  // Then
  expect(getByText(value)).toHaveStyleRule('text-decoration', 'underline')
  expect(getByRole('heading')).toHaveTextContent(subtitle)
})
