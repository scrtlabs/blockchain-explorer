import shrinkHexString from '../shrinkHexString'

const address = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'

describe('shrinkHexString utility', () => {
  it(`should return an empty string if value is ''`, () => {
    // Given
    const value = ''

    // When
    const shrankValue = shrinkHexString(value)

    // Then
    expect(shrankValue).toEqual('')
  })

  it(`should return an empty string if not value is provided`, () => {
    const shrankValue = shrinkHexString()
    expect(shrankValue).toEqual('')
  })

  it(`should return '0x90F8...8c9C1' for start=4 and end=5`, () => {
    // Given
    const start = 4
    const end = 5

    // When
    const shrankValue = shrinkHexString(address, start, end)

    // Then
    expect(shrankValue).toEqual('0x90F8...8c9C1')
  })

  it(`should return '0x9...1' if start and end default values`, () => {
    const shrankValue = shrinkHexString(address)
    expect(shrankValue).toEqual('0x9...1')
  })

  it(`should return '0x...' if start=0 and end=0`, () => {
    // Given
    const start = 0
    const end = 0

    // When
    const shrankValue = shrinkHexString(address, start, end)

    // Then
    expect(shrankValue).toEqual('0x...')
  })
})
