import React, { useState } from 'react'
import SearchIcon from './img/search.svg'
import CloseIcon from './img/close.svg'
import styled from 'styled-components'

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

const InputBase = styled.input`
  background-color: transparent;
  border: none;
  color: #333;
  flex-grow: 1;
  font-size: 13px;
  font-weight: normal;
  height: 30px;
  outline: none;
  text-align: left;
`

const SearchBar = ({ onRequestSearch, onClearSearch }) => {
  const [searchValue, setSearchValue] = useState('')

  const handleClear = () => {
    onClearSearch()
    setSearchValue('')
  }

  return (
    <SearchForm onSubmit={event => onRequestSearch(event, searchValue)}>
      <IconButton disabled={!searchValue}>
        <img src={SearchIcon} alt="" />
      </IconButton>
      <InputBase
        id="ethAddress"
        onChange={event => setSearchValue(event.target.value)}
        placeholder="Search by hash..."
        type="text"
        value={searchValue}
      />
      <IconButton onClick={handleClear}>
        <img src={CloseIcon} alt="" />
      </IconButton>
    </SearchForm>
  )
}

export default SearchBar
