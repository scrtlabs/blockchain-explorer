import React from 'react'
import styled from 'styled-components'
import NetworkInfoCard from '../NetworkInfoCard'
import SelectableGraph from '../SelectableGraph'
import SectionTitle from '../Common/SectionTitle'

const TopRow = styled.div`
  display: grid;
  grid-row-gap: ${props => props.theme.separation.blockVerticalSeparation};
  grid-template-columns: 1fr;
  margin-bottom: ${props => props.theme.separation.blockBottomMargin};

  @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
    grid-column-gap: ${props => props.theme.separation.blockVerticalSeparation};
    grid-template-columns: 1fr 3fr;
  }
`

const HomeNetworkInfo = () => {
  return (
    <>
      <SectionTitle>Network</SectionTitle>
      <TopRow>
        <NetworkInfoCard />
        <SelectableGraph />
      </TopRow>
    </>
  )
}

export default HomeNetworkInfo
