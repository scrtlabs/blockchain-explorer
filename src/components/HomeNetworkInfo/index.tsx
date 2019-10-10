import React from 'react'
import styled from 'styled-components'
import NetworkInfoCard from '../NetworkInfoCard'
import SelectableGraph from '../SelectableGraph'
import SectionTitle from '../Common/SectionTitle'
import SearchBar from '../Common/SearchBar'

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
      <SectionTitle
        right={
          <SearchBar
            onRequestSearch={() => {
              console.log('request search...')
            }}
            onClearSearch={() => {
              console.log('clear search...')
            }}
          />
        }
      >
        Network
      </SectionTitle>
      <TopRow>
        <NetworkInfoCard />
        <SelectableGraph />
      </TopRow>
    </>
  )
}

export default HomeNetworkInfo
