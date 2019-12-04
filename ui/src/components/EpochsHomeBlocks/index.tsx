import React from 'react'
import styled from 'styled-components'
import { useSubscription } from '@apollo/react-hooks'
import SectionTitle from '../Common/SectionTitle'
import EpochBlock from '../EpochBlock'
import EpochBlockLoading from '../EpochBlockLoading'
import ethApi from '../../utils/eth'
import estimateCurrentEpochEnd from '../../utils/estimateCurrentEpochEnd'
import { ENG_STATE_SUBSCRIPTION, EPOCHS_INITIAL_VALUES, EPOCHS_SUBSCRIPTION } from '../Epochs/queries'

const EpochsRow = styled.div`
  display: grid;
  grid-row-gap: ${props => props.theme.separation.blockVerticalSeparation};
  grid-template-columns: 1fr;
  margin-bottom: ${props => props.theme.separation.blockBottomMargin};

  @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
    grid-column-gap: ${props => props.theme.separation.blockVerticalSeparation};
    grid-template-columns: 1fr 1fr 1fr;
  }
`

const extractCurrentEpoch = async (data: any, currentBlockNumber: number) => {
  if (data && data.epoches) {
    const { epoches: epochsHistory } = data
    const epoch = epochsHistory[0]
    const {
      finishBlockNumber,
      pendingTime,
    }: { finishBlockNumber?: number; pendingTime?: number } = await estimateCurrentEpochEnd(epochsHistory)

    return {
      isCurrent: true,
      currentBlockNumber,
      finishBlockNumber,
      pendingTime,
      epoch,
    }
  }
}

const extractEpochs = (data: any, currentBlockNumber: number): any => {
  if (data && data.epoches) {
    const { epoches: epochsHistory } = data
    const epoches = epochsHistory.slice(1, 3)

    const calculateEpochValues = (epoch: any) => ({
      isCurrent: false,
      currentBlockNumber,
      epoch,
    })

    return epoches.map(calculateEpochValues)
  }

  return []
}

const EpochHomeBlocks = () => {
  const [epochs, setEpochs] = React.useState([])
  const [currentEpoch, setCurrentEpoch] = React.useState()
  const [currentBlockNumber, setCurrentBlockNumber] = React.useState(0)
  const { data, error } = useSubscription(EPOCHS_SUBSCRIPTION, { variables: EPOCHS_INITIAL_VALUES })
  const { data: engState, error: engStateError } = useSubscription(ENG_STATE_SUBSCRIPTION)

  if (error) console.error(error.message)
  if (engStateError) console.error(engStateError.message)

  React.useMemo(() => {
    extractCurrentEpoch({ ...data, ...engState }, currentBlockNumber).then(newCurrentEpoch =>
      setCurrentEpoch(newCurrentEpoch as any),
    )
    setEpochs(extractEpochs({ ...data, ...engState }, currentBlockNumber))
  }, [data, engState, currentBlockNumber])

  React.useEffect(() => {
    const intervalPtr = setInterval(async () => {
      const actualBlockNumber = await ethApi.getBlockNumber()
      setCurrentBlockNumber(actualBlockNumber)
    }, 1000)
    return () => clearInterval(intervalPtr)
  }, [])

  return (
    <>
      <SectionTitle>Epochs</SectionTitle>
      <EpochsRow>
        {currentEpoch ? <EpochBlock {...currentEpoch} /> : <EpochBlockLoading />}
        {epochs[0] ? <EpochBlock {...epochs[0]} /> : <EpochBlockLoading />}
        {epochs[1] ? <EpochBlock {...epochs[1]} /> : <EpochBlockLoading />}
      </EpochsRow>
    </>
  )
}

export default EpochHomeBlocks
