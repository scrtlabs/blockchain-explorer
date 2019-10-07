import React from 'react'
import TablePagination, { TablePaginationProps } from '@material-ui/core/TablePagination'
import styled from 'styled-components'
import TablePaginationActions from './TablePaginationActions'

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
