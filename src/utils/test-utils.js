import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import theme from '../theme'

const getStyledComponents = StyledComponent => {
  const componentClass = StyledComponent().type.styledComponentId
  return document.getElementsByClassName(componentClass)
}

const AllTheProviders = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Router>{children}</Router>
  </ThemeProvider>
)

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render, getStyledComponents }
