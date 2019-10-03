import ethNetworks from '../networks.json'
import getNetworkDetailsBy from '../networks'

describe('networks utility', () => {
  it(`should fail if 'by' is invalid`, () => {
    // Given
    const by = 'a-non-valid-value'

    // When
    const callWithInvalidValue = () => getNetworkDetailsBy(by)

    // Then
    expect(callWithInvalidValue).toThrow(Error)
  })

  describe('getNetworkDetailsById', () => {
    it(`should return 'Unknown' as default value if ID is invalid`, () => {
      // Given
      const by = 'id'
      const id = -1
      const unknownNetwork = {
        name: 'unknown',
        label: 'Unknown',
        url: 'none',
      }

      // When
      const getNetworkById = getNetworkDetailsBy(by)

      // Then
      expect(getNetworkById(id)).toEqual(unknownNetwork)
    })

    it(`should return kovan details for id=42`, () => {
      // Given
      const by = 'id'
      const id = 42
      const kovan = {
        label: ethNetworks.kovan.label,
        url: ethNetworks.kovan.url,
        name: 'kovan',
      }

      // When
      const getNetworkById = getNetworkDetailsBy(by)

      // Then
      expect(getNetworkById(id)).toEqual(kovan)
    })
  })

  describe('getNetworkDetailsByName', () => {
    it(`should return 'Unknown' as default value if ID is invalid`, () => {
      // Given
      const by = 'name'
      const name = 'a-non-existent-network-name'

      // When
      const getNetworkByName = getNetworkDetailsBy(by)

      // Then
      expect(getNetworkByName(name)).toEqual(ethNetworks.unknown)
    })
  })

  it(`should return kovan details for name='kovan'`, () => {
    // Given
    const by = 'name'
    const name = 'kovan'

    // When
    const getNetworkByName = getNetworkDetailsBy(by)

    // Then
    expect(getNetworkByName(name)).toEqual(ethNetworks.kovan)
  })
})
