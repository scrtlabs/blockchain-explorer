import sortList from '../sortList'

describe('sortList', () => {
  const list = [{ a: 'ahistorical', b: 'bottleneck' }, { a: 'aye', b: 'bottleneck' }, { a: '0aye', b: 'bookkeeping' }]

  it(`should properly sort using a in 'desc' order`, () => {
    expect(sortList(list, 'desc', 'a')).toEqual([
      { a: 'aye', b: 'bottleneck' },
      { a: 'ahistorical', b: 'bottleneck' },
      { a: '0aye', b: 'bookkeeping' },
    ])
  })

  it(`should properly sort using b in 'asc' order`, () => {
    expect(sortList(list, 'asc', 'b')).toEqual([
      { a: '0aye', b: 'bookkeeping' },
      { a: 'ahistorical', b: 'bottleneck' },
      { a: 'aye', b: 'bottleneck' },
    ])
  })

  it(`should properly sort using a in 'asc' order`, () => {
    expect(sortList(list, 'asc', 'a')).toEqual([
      { a: '0aye', b: 'bookkeeping' },
      { a: 'ahistorical', b: 'bottleneck' },
      { a: 'aye', b: 'bottleneck' },
    ])
  })
})
