import React from 'react'
import { render } from '../../../utils/test-utils'
import LocaleDate from './'

const someDate = '2019-09-19T13:43:37.122Z'

describe('LocaleDate', () => {
  it('renders "Invalid Date" sentence', () => {
    const { container } = render(<LocaleDate>not a day</LocaleDate>)
    expect(container).toHaveTextContent('Invalid Date')
  })

  it('renders HexAddr specified start/end values', () => {
    const { container } = render(<LocaleDate>{someDate}</LocaleDate>)
    expect(container).toBeInTheDocument()
    expect(container).not.toHaveTextContent('Invalid Date')
  })

  it('renders null if a falsy children is specified', () => {
    const { container } = render(<LocaleDate />)
    expect(container).toHaveTextContent('')
  })

  it(`should throw if children is a ReactNode`, () => {
    console.error = jest.fn()

    const toRender = () =>
      render(
        <LocaleDate>
          <div>{someDate}</div>
        </LocaleDate>,
      )

    expect(toRender).toThrowError()
  })
})
