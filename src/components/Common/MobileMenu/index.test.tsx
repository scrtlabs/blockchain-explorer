import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from '../../../theme'
import MobileMenu from './'

it('renders MobileMenu with menu closed', () => {
  const fn = jest.fn()
  const div = document.createElement('div')

  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Router>
        <MobileMenu isMenuOpen={false} toggleMenu={fn} />
      </Router>
    </ThemeProvider>,
    div,
  )
  ReactDOM.unmountComponentAtNode(div)
})

it('renders MobileMenu with menu open', () => {
  const fn = jest.fn()
  const div = document.createElement('div')

  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Router>
        <MobileMenu isMenuOpen={true} toggleMenu={fn} />
      </Router>
    </ThemeProvider>,
    div,
  )
  ReactDOM.unmountComponentAtNode(div)
})
