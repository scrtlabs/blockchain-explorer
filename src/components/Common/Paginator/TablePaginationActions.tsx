import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'

interface TablePaginationActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number
  page: number
  rowsPerPage: number
  onChangePage: CallableFunction
}

const TablePaginationActions = ({ count, page, rowsPerPage, onChangePage }: TablePaginationActionsProps) => {
  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
    onChangePage(event, 0)
  }

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
    onChangePage(event, page + 1)
  }

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div style={{ flexShrink: 0 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        aria-label="next page"
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        onClick={handleNextButtonClick}
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </div>
  )
}

export default TablePaginationActions
