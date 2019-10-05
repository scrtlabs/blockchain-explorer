import React from 'react'
import TablePagination, { TablePaginationProps } from '@material-ui/core/TablePagination'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import styled from 'styled-components'

interface TablePaginationActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number
  page: number
  rowsPerPage: number
  onChangePage: CallableFunction
}

const PaginatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
    justify-content: flex-end;
  }
`

const TablePaginationStyled = styled(TablePagination)<any>`
  padding: 10px 0 0 0;

  > div {
    color: #666;
    flex-direction: column;
    font-size: 12px;
    height: auto;
    min-height: 0;
    padding: 0;

    @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
      flex-direction: row;
    }
  }
`

const TablePaginationActions = ({ count, page, rowsPerPage, onChangePage }: TablePaginationActionsProps) => {
  const handleFirstPageButtonClick = (event: React.SyntheticEvent) => {
    onChangePage(event, 0)
  }

  const handleBackButtonClick = (event: React.SyntheticEvent) => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = (event: React.SyntheticEvent) => {
    onChangePage(event, page + 1)
  }

  const handleLastPageButtonClick = (event: React.SyntheticEvent) => {
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

const Paginator = (props: TablePaginationProps) => (
  <PaginatorWrapper>
    <TablePaginationStyled
      {...props}
      component="div"
      rowsPerPageOptions={[25, 50, 100, 200]}
      SelectProps={{
        inputProps: { 'aria-label': 'rows per page' },
        native: true,
      }}
      ActionsComponent={TablePaginationActions}
    />
  </PaginatorWrapper>
)

export default Paginator
