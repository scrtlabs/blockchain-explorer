import React, { useState } from 'react'
import Checkbox from '../Checkbox'
import styled from 'styled-components'

const FilterItemWrapper = styled.span`
  align-items: center;
  border-bottom: solid 1px ${props => props.theme.borders.borderColor};
  display: flex;
  padding: 12px 8px;
`

const Text = styled.span`
  color: #444;
  font-size: 12px;
  font-weight: normal;
  line-height: 1.2;
  margin: 0 0 0 6px;
  text-align: left;
`

interface CheckboxProps {
  checked?: boolean
  onChange?: any
  text: any
}

const FilterItem: React.FC<CheckboxProps> = (props: CheckboxProps) => {
  const { text, checked, onChange, ...restProps } = props
  const [isChecked, setChecked] = useState(checked || false)

  const updateChecked = () => {
    setChecked(!isChecked)
  }

  return (
    <FilterItemWrapper onClick={updateChecked} {...restProps}>
      <Checkbox onChange={onChange} checked={isChecked} />
      <Text>{text}</Text>
    </FilterItemWrapper>
  )
}

export default FilterItem
