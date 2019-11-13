import addOx from '../add0x'

it(`should add 0x to the string provided`, () => {
  // Given
  const hexValue = '90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'

  // When
  const formattedHexValue = addOx(hexValue)

  // Then
  expect(formattedHexValue).toEqual(`0x${hexValue}`)
})

it(`should not add 0x to the string if already has 0x`, () => {
  // Given
  const hexValue = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'

  // When
  const formattedHexValue = addOx(hexValue)

  // Then
  expect(formattedHexValue).toEqual(hexValue)
})

it(`should not add 0x an empty string`, () => {
  // Given
  const hexValue = ''

  // When
  const formattedHexValue = addOx(hexValue)

  // Then
  expect(formattedHexValue).toEqual(hexValue)
})
