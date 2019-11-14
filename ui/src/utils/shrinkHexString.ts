const shrinkHexString = (value = '', start = 1, end = 1) => {
  const matcher = new RegExp(`(?:(0?x?[a-f0-9]{${start}})).*([a-f0-9]{${end}})`, 'i')
  const [, ...matches] = value.match(matcher) || []
  return matches.join('...')
}

export default shrinkHexString
