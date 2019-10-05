import React from 'react'
import { render } from '../../../utils/test-utils'
import TableOverflow from './'

it('renders TableOverflow with expected styles props', () => {
  const { container } = render(<TableOverflow />)

  expect(container.lastElementChild).toHaveStyleRule('overflow-x', 'auto')
  expect(container.lastElementChild).toHaveStyleRule('width', '100%')
})

it('renders TableOverflow with proper content', () => {
  // Given
  const table = (
    <table>
      <tbody>
        <tr>
          <td>only cell</td>
        </tr>
      </tbody>
    </table>
  )

  // When
  const { queryAllByRole } = render(<TableOverflow>{table}</TableOverflow>)

  // Then
  expect(queryAllByRole('table')).toHaveLength(1)
})
