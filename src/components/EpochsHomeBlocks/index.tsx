import React from 'react'
import styled from 'styled-components'
import SectionTitle from '../Common/SectionTitle'
import EpochBlock from '../EpochBlock'

const EpochsRow = styled.div`
  display: grid;
  grid-column-gap: ${props => props.theme.separation.blockVerticalSeparation};
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: ${props => props.theme.separation.blockBottomMargin};
`

const blockCurrent = {
  current: true,
  epoch: '123456',
  progress: '92',
  tasks: '15000',
  time: '2d 23h 54m',
}

const block2 = {
  epoch: '123455',
  progress: '100',
  tasks: '53643',
  time: '50 days ago',
}

const block3 = {
  epoch: '123454',
  progress: '35.63',
  tasks: '12643',
  time: '55 days ago',
}

const EpochHomeBlocks = () => {
  return (
    <>
      <SectionTitle>Epochs</SectionTitle>
      <EpochsRow>
        <EpochBlock values={blockCurrent} />
        <EpochBlock values={block2} />
        <EpochBlock values={block3} />
      </EpochsRow>
    </>
  )
}

export default EpochHomeBlocks
