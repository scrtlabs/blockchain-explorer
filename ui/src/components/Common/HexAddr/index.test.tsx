import React from 'react'
import { render } from '../../../utils/test-utils'
import HexAddr from './'

const address = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'

it('renders HexAddr with default start/end values', () => {
  render(<HexAddr>{address}</HexAddr>)
})

it('should throw if children is a ReactNode', () => {
  console.error = jest.fn()

  const toRender = () =>
    render(
      <HexAddr>
        <div>{address}</div>
      </HexAddr>,
    )

  expect(toRender).toThrowError()
})

it('renders HexAddr specified start/end values', () => {
  render(
    <HexAddr start={3} end={8}>
      {address}
    </HexAddr>,
  )
})
