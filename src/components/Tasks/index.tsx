import React from 'react'
import BaseTable from '../Common/BaseTable'
import { HeaderCellAlign } from '../Common/EnhancedTableHead'

const HEADER_CELLS = [
  { id: 'taskId', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'Task ID' },
  { id: 'taskStatus', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'Status' },
  { id: 'taskEpochNumber', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'Epoch' },
  { id: 'taskUserAddress', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'User' },
  { id: 'taskScAddress', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'Secret Contract' },
  { id: 'taskEngGasUsed', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'ENG Gas Used' },
  { id: 'taskNumber', useClassShowOnDesktop: false, align: HeaderCellAlign.flexStart, label: 'Task Number' },
]

const Tasks = () => {
  return (
    <>
      <BaseTable
        headerProps={{
          headerCells: HEADER_CELLS,
          order: 'asc',
          orderBy: 'taskId',
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

export default Tasks
