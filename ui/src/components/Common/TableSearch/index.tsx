import React, { useState } from 'react'
import SearchIcon from './img/search.svg'
import CloseIcon from './img/close.svg'
import styled from 'styled-components'

interface TableSearchProps extends React.HTMLAttributes<HTMLDivElement> {
  onRequestSearch: CallableFunction
  onClearSearch: CallableFunction
  placeholder: string
  id: string
  realTimeSearch?: boolean
}

const SearchForm = styled.form`
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  height: 30px;
  width: 100%;

  @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
    width: 285px;
  }
`

const IconButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  display: flex;
  height: 30px;
  justify-content: center;
  padding: 0;
  outline: none;
  width: 30px;

  &:active {
    opacity: 0.5;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const InputBase = styled.input<any>`
  background-color: transparent;
  border: none;
  color: ${props => props.theme.colors.textCommon};
  flex-grow: 1;
  font-size: 13px;
  font-weight: normal;
  height: 30px;
  outline: none;
  text-align: left;
`

const TableSearch = ({ onRequestSearch, onClearSearch, placeholder, id, realTimeSearch = true }: TableSearchProps) => {
  const [searchValue, setSearchValue] = useState('')

  const handleClear: React.EventHandler<React.SyntheticEvent> = event => {
    event.preventDefault()
    onClearSearch()
    setSearchValue('')
  }

  const handleInputChange: React.EventHandler<React.SyntheticEvent> = event => {
    const { value } = event.target as HTMLInputElement
    setSearchValue(value)

    if (realTimeSearch) {
      onRequestSearch(value)
    }
  }

  return (
    <SearchForm onSubmit={() => onRequestSearch(searchValue)}>
      <IconButton disabled={!searchValue}>
        <img src={SearchIcon} alt="Search" />
      </IconButton>
      <InputBase
        id={id}
        inputProps={{ 'aria-label': placeholder }}
        onChange={handleInputChange}
        placeholder={placeholder}
        type="text"
        value={searchValue}
      />
      <IconButton onClick={handleClear}>
        <img src={CloseIcon} alt="Clear Search" />
      </IconButton>
    </SearchForm>
  )
}

export default TableSearch
