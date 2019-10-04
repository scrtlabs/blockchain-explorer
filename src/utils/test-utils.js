import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import theme from '../theme'

const getStyledComponents = StyledComponent => {
  const componentClass = StyledComponent().type.styledComponentId
  return document.getElementsByClassName(componentClass)
}

const history = createBrowserHistory()

const AllTheProviders = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Router history={history}>{children}</Router>
  </ThemeProvider>
)

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render, getStyledComponents, history }
