import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import theme from '../../../theme'
import FullLoading from './'

it('renders FullLoading without crashing', () => {
  const div = document.createElement('div')
  div.setAttribute('id', 'loadingContainer')
  const container = document.body.appendChild(div)

  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <FullLoading />
    </ThemeProvider>,
    container,
  )
  ReactDOM.unmountComponentAtNode(container)
})

it('renders FullLoading without crashing and without message', () => {
  const div = document.createElement('div')
  div.setAttribute('id', 'loadingContainer')
  const container = document.body.appendChild(div)

  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <FullLoading message="" />
    </ThemeProvider>,
    container,
  )
  ReactDOM.unmountComponentAtNode(container)
})
