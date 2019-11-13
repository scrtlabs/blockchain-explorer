import React from 'react'
import { render } from '../../utils/test-utils'
import Card from '.'

it('renders Card without title', () => {
  render(<Card noPadding={false}>This is the card content</Card>)
})

it('renders Card with title', () => {
  render(
    <Card noPadding={false} title="Card Title">
      This is the card content
    </Card>,
  )
})

it('renders Card with title and 0 padding', () => {
  render(
    <Card noPadding={true} title="Card Title">
      This is the card content
    </Card>,
  )
})
