import React from 'react'
import { render } from '../../../utils/test-utils'
import MobileMenu from './'

it('renders MobileMenu with menu closed', () => {
  const fn = jest.fn()
  render(<MobileMenu isMenuOpen={false} toggleMenu={fn} />)
})

it('renders MobileMenu with menu open', () => {
  const fn = jest.fn()
  render(<MobileMenu isMenuOpen={true} toggleMenu={fn} />)
})
