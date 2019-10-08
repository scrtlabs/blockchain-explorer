import { formatNumber, formatStake, formatTime } from '../numeralFormats'

describe('formatNumber', () => {
  const cases = [
    { value: 123, expected: '123' },
    { value: 1234, expected: '1,234' },
    { value: 1234.33, expected: '1,234.33' },
  ]

  cases.map(({ value, expected }) => {
    it(`should format ${value} as ${expected}`, () => {
      expect(formatNumber(value)).toEqual(expected)
    })
  })
})

describe('formatTime', () => {
  const cases = [
    { value: 60, expected: '0:01:00' },
    { value: 62, expected: '0:01:02' },
    { value: 12000, expected: '3:20:00' },
    { value: 120000, expected: '33:20:00' },
  ]

  cases.map(({ value, expected }) => {
    it(`should format ${value} as ${expected}`, () => {
      expect(formatTime(value)).toEqual(expected)
    })
  })
})

describe('formatStake', () => {
  const cases = [
    { value: 123, expected: '123' },
    { value: 1231231, expected: '1,231,231' },
    { value: 1231231.12, expected: '1,231,231.12000000' },
  ]

  cases.map(({ value, expected }) => {
    it(`should format ${value} as ${expected}`, () => {
      expect(formatStake(value)).toEqual(expected)
    })
  })
})
