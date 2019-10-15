import React from 'react'
import BaseTable from '../Common/BaseTable'
import { HeaderCellAlign } from '../Common/EnhancedTableHead'
import Card from '../Common/Card'
import SectionTitle from '../Common/SectionTitle'
import CopyText from '../Common/CopyText'
import { ButtonView } from '../Common/ButtonView'
import { ButtonExpand } from '../Common/ButtonExpand'
import GridCell, { GridCellStyled, Title, Value } from '../Common/GridCell'
import styled from 'styled-components'

const DetailsCard = styled(Card)`
  margin-bottom: 35px;

  > div {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 15px;

    @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
      column-gap: 15px;
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media (min-width: ${props => props.theme.themeBreakPoints.xxl}) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
  }
`

const ValueStyled = styled(Value)`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`

const HEADER_CELLS = [
  { id: 'taskID', useClassShowOnDesktop: true, align: HeaderCellAlign.flexStart, label: 'Task ID' },
  { id: 'status', useClassShowOnDesktop: true, align: HeaderCellAlign.center, label: 'Status' },
  {
    id: 'epoch',
    useClassShowOnDesktop: true,
    align: HeaderCellAlign.center,
    label: 'Epoch',
  },
  {
    id: 'user',
    useClassShowOnDesktop: true,
    align: HeaderCellAlign.center,
    label: 'User',
  },
  { id: 'secretContract', useClassShowOnDesktop: true, align: HeaderCellAlign.center, label: 'Secret Contract' },
  { id: 'engGasUsed', useClassShowOnDesktop: true, align: HeaderCellAlign.flexEnd, label: 'ENG Gas Used' },
  { id: 'Task Number', useClassShowOnDesktop: true, align: HeaderCellAlign.flexEnd, label: 'Task Number' },
]

const Contract = () => {
  return (
    <>
      <SectionTitle>Contract</SectionTitle>
      <DetailsCard>
        <GridCellStyled>
          <Title>Address</Title>
          <ValueStyled>
            <span>0xffd4a06a…e2fde603f9a</span> <CopyText value={'2134'} />
          </ValueStyled>
        </GridCellStyled>
        <GridCell title="Tasks" value={'99999999'} />
        <GridCell title="User Addresses" value={'5566777'} />
        <ButtonView>Contracts Called</ButtonView>
        <ButtonExpand>Expand Bytecode</ButtonExpand>
      </DetailsCard>
      <SectionTitle>Selected Epochs</SectionTitle>
      <BaseTable
        headerProps={{
          headerCells: HEADER_CELLS,
          order: 'asc',
          orderBy: 'taskID',
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

export default Contract
