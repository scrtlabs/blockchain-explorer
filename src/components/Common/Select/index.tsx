import React from 'react'
import styled from 'styled-components'
import { IconSelect } from './img/IconSelect'

export interface OptionsProps {
  selected?: boolean
  text: string
  value: string
}

interface SelectWrapper {
  disabled?: boolean
}

interface Props extends SelectWrapper {
  className?: string
  name: string
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => any
  onClick?: (event: React.MouseEvent<HTMLSelectElement>) => any
  options: Array<OptionsProps>
}

const SelectWrapper = styled.div<SelectWrapper>`
  color: #444;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'default')};
  font-size: 14px;
  font-weight: normal;
  opacity: ${props => (props.disabled ? '0.5' : '1')};
  outline: none;
  padding: 6px 0 6px 4px;
  position: relative;
  z-index: 1;

  > svg {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }
`

SelectWrapper.defaultProps = {
  disabled: false,
}

const FormSelect = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  border: none;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  outline: none;
  padding: 0 20px 0 0;
  position: relative;
  width:100%;
  z-index: 5;
`

const Select = (props: Props) => {
  const { options, disabled, name, onChange, onClick, className } = props

  return (
    <SelectWrapper className={className} disabled={disabled}>
      <FormSelect disabled={disabled} name={name} onChange={onChange} onClick={onClick}>
        {options.map((item, index) => {
          return (
            <option selected={item.selected} key={index} value={item.value}>
              {item.text}
            </option>
          )
        })}
      </FormSelect>
      <IconSelect />
    </SelectWrapper>
  )
}

export default Select
