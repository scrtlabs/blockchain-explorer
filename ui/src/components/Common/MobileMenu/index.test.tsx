import React from 'react'
import { render } from '../../../utils/test-utils'
import MobileMenu from './'

it('renders MobileMenu with menu closed', () => {
  const fn = jest.fn()
  const { queryAllByRole } = render(<MobileMenu isMenuOpen={false} toggleMenu={fn} />)
  expect(queryAllByRole('link')).toHaveLength(0)
})

it('renders MobileMenu with menu open', () => {
  const fn = jest.fn()
  const { queryAllByRole } = render(<MobileMenu isMenuOpen={true} toggleMenu={fn} />)
  expect(queryAllByRole('link').length).toBeGreaterThan(0)
})
