import React from 'react'
import BaseTable from '../Common/BaseTable'
import { HeaderCellAlign } from '../Common/EnhancedTableHead'

const HEADER_CELLS = [
  { id: 'workerAddress', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'Address' },
  { id: 'workerStackedEng', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'Staked ENG' },
  {
    id: 'workerActiveVsTotal',
    useClassShowOnDesktop: false,
    align: HeaderCellAlign.flexStart,
    label: 'Epochs Active / Total Epochs',
  },
  {
    id: 'workerCompletedTasks',
    useClassShowOnDesktop: false,
    align: HeaderCellAlign.flexStart,
    label: '% Of Completed Tasks',
  },
  { id: 'workerEngReward', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'ENG Reward' },
]

const Workers = () => {
  return (
    <>
      <BaseTable
        headerProps={{
          headerCells: HEADER_CELLS,
          order: 'asc',
          orderBy: 'workerAddress',
          onRequestSort: console.log.bind(console, 'requestSort'),
        }}
        rows={[]}
        paginatorProps={{
          colSpan: HEADER_CELLS.length,
          count: [].length,
          onChangePage: console.log.bind(console, 'changePage'),
          onChangeRowsPerPage: console.log.bind(console, 'rowsPerPage'),
          page: 0,
          rowsPerPage: 50,
        }}
      />
    </>
  )
}

export default Workers
