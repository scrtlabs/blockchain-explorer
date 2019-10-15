import React from 'react'
import BaseTable from '../Common/BaseTable'
import { HeaderCellAlign } from '../Common/EnhancedTableHead'
import Card from '../Common/Card'
import SectionTitle from '../Common/SectionTitle'
import CopyText from '../Common/CopyText'
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

    @media (min-width: ${props => props.theme.themeBreakPoints.lg}) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
  }
`

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

const Worker = () => {
  return (
    <>
      <SectionTitle>Worker</SectionTitle>
      <DetailsCard>
        <GridCellStyled>
          <Title>Address</Title>
          <Value>
            0xffd4a06a4dc6…00a4e2fde603f9a <CopyText value={'2134'} />
          </Value>
        </GridCellStyled>
        <GridCell title="Successful Tasks" value={'498 / 500'} />
        <GridCell title="ENG Rewards" value={'123456.789'} />
        <GridCell title="ENG Staked" value={'10000'} />
        <GridCell title="Epochs Active" value={'48 / 50'} />
      </DetailsCard>
      <SectionTitle>Selected Epochs</SectionTitle>
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

export default Worker
