import React from 'react'
import { render } from '../../../utils/test-utils'
import LocaleDate from './'

const someDate = '2019-09-19T13:43:37.122Z'

describe('LocaleDate', () => {
  it('renders "Invalid Date" sentence', () => {
    const { container } = render(<LocaleDate>not a day</LocaleDate>)
    expect(container.firstChild && container.firstChild.textContent).toEqual('Invalid Date')
  })

  it('renders HexAddr specified start/end values', () => {
    const { container } = render(<LocaleDate>{someDate}</LocaleDate>)
    expect(container.firstChild).not.toBeNull()
    expect(container.firstChild && container.firstChild.textContent).not.toEqual('Invalid Date')
  })

  it('renders null if a falsy children is specified', () => {
    const { container } = render(<LocaleDate />)
    expect(container.firstChild).toBeNull()
  })

  it(`should throw if children is a ReactNode`, () => {
    const toRender = () =>
      render(
        <LocaleDate>
          <div>{someDate}</div>
        </LocaleDate>,
      )

    expect(toRender).toThrowError()
  })
})
