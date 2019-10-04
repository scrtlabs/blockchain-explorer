import React from 'react'
import { render, history } from '../../utils/test-utils'
import App from './'

it('renders App without crashing', () => {
  render(<App />)
})

it(`should render Dashboard by default`, () => {
  // Given
  const { container } = render(<App />)

  // When
  const menuItem = container.querySelector('[aria-current=page]')

  // Then
  expect(menuItem).toHaveClass('active')
  expect(menuItem).toHaveTextContent('Home')
})

it(`should show 404 if bad url`, () => {
  // Given
  history.push('/a-non-existent-route')

  // When
  const { container } = render(<App />)

  // Then
  expect(container).toHaveTextContent('404 Not Found')
})

it(`should have swapped to 'home' page`, () => {
  // Given
  history.push('/home')

  // When
  const { container } = render(<App />)
  const menuItem = container.querySelector('[aria-current=page]')

  // Then
  expect(menuItem).toHaveClass('active')
  expect(menuItem).toHaveTextContent('Home')
})

it(`should have swapped to 'tasks' page`, () => {
  // Given
  history.push('/tasks')

  // When
  const { container } = render(<App />)
  const menuItem = container.querySelector('[aria-current=page]')

  // Then
  expect(menuItem).toHaveClass('active')
  expect(menuItem).toHaveTextContent('Tasks')
})

it(`should have swapped to 'users' page`, () => {
  // Given
  history.push('/users')

  // When
  const { container } = render(<App />)
  const menuItem = container.querySelector('[aria-current=page]')

  // Then
  expect(menuItem).toHaveClass('active')
  expect(menuItem).toHaveTextContent('Users')
})

it(`should have swapped to 'workers' page`, () => {
  // Given
  history.push('/workers')

  // When
  const { container } = render(<App />)
  const menuItem = container.querySelector('[aria-current=page]')

  // Then
  expect(menuItem).toHaveClass('active')
  expect(menuItem).toHaveTextContent('Workers')
})
