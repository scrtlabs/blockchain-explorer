import React from 'react'
import styled from 'styled-components'
import NetworkInfoCard from '../NetworkInfoCard'
import SelectableGraph from '../SelectableGraph'

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: ${props => props.theme.separation.blockVerticalSeparation};
`

const Home = () => {
  return (
    <TopRow>
      <NetworkInfoCard />
      <SelectableGraph />
    </TopRow>
  )
}

export default Home
