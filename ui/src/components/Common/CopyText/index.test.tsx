import React from 'react'
import { render } from '../../../utils/test-utils'
import CopyText from './'

it('renders CopyText snippet', () => {
  render(<CopyText canCopy={true} value="this is the value to copy" />)
})

it('renders null when CopyText is disabled', () => {
  render(<CopyText canCopy={false} value="there will be nothing" />)
})
