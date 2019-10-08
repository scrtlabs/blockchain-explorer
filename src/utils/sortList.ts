const desc = (a: any, b: any, orderBy: string) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const stableSort = (list: [], cmp: CallableFunction) => {
  const stabilizedThis = list.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const getSorting = (order: 'asc' | 'desc', orderBy: string) =>
  order === 'desc' ? (a: object, b: object) => desc(a, b, orderBy) : (a: object, b: object) => -desc(a, b, orderBy)

const sortList = (list: [], order: 'asc' | 'desc', orderBy: string) => stableSort(list, getSorting(order, orderBy))

export default sortList
