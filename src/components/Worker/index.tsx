import React from 'react'
import Card from '../Common/Card'
import SectionTitle from '../Common/SectionTitle'
import CopyText from '../Common/CopyText'
import GridCell, { GridCellStyled, Title, Value } from '../Common/GridCell'
import styled from 'styled-components'
import Epochs from '../Epochs'
import HexAddr from '../Common/HexAddr'

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

const Worker = (props: any) => {
  const {
    match: {
      params: { workerAddress },
    },
  } = props
  return (
    <>
      <SectionTitle>Worker</SectionTitle>
      <DetailsCard>
        <GridCellStyled>
          <Title>Address</Title>
          <ValueStyled>
            <HexAddr start={8} end={8}>
              {workerAddress}
            </HexAddr>{' '}
            <CopyText text={workerAddress} />
          </ValueStyled>
        </GridCellStyled>
        <GridCell title="Successful Tasks" value={'498 / 500'} />
        <GridCell title="ENG Rewards" value={'123456.789'} />
        <GridCell title="ENG Staked" value={'10000'} />
        <GridCell title="Epochs Active" value={'48 / 50'} />
      </DetailsCard>
      <Epochs title="Selected Epochs" />
    </>
  )
}

export default Worker
