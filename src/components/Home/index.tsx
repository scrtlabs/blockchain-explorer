import React from 'react'
import styled from 'styled-components'
import NetworkInfoCard from '../NetworkInfoCard'
import SelectableGraph from '../SelectableGraph'
import EpochsHomeBlocks from '../EpochsHomeBlocks'
import TasksHome from '../TasksHome'

const TopRow = styled.div`
  display: grid;
  grid-column-gap: ${props => props.theme.separation.blockVerticalSeparation};
  grid-template-columns: 1fr 3fr;
  margin-bottom: ${props => props.theme.separation.blockBottomMargin};
`

const Home = () => {
  return (
    <>
      <TopRow>
        <NetworkInfoCard />
        <SelectableGraph />
      </TopRow>
      <EpochsHomeBlocks />
      <TasksHome />
    </>
  )
}

export default Home
