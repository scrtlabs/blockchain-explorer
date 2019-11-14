import React from 'react'
import { render } from '../../utils/test-utils'
import EpochBlock from './'

it('renders ended EpochBlock', () => {
  // Given
  const epochValues = { epoch: '123', progress: '88', tasks: '150', time: '30 min' }

  // When
  const { container, getAllByRole } = render(<EpochBlock values={epochValues} />)

  // Then
  expect(container).toMatchSnapshot()
  expect(getAllByRole('heading').pop()).toHaveTextContent('Ended')
})

it('renders current EpochBlock', () => {
  // Given
  const epochValues = { current: true, epoch: '123', progress: '88', tasks: '150', time: '30 min' }

  // When
  const { container, getAllByRole } = render(<EpochBlock values={epochValues} />)

  // Then
  expect(container).toMatchSnapshot()
  expect(getAllByRole('heading').pop()).toHaveTextContent('Time Left')
})
