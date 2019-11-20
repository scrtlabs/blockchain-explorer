import React from 'react'
import styled from 'styled-components'
import { useSubscription } from '@apollo/react-hooks'
import SectionTitle from '../Common/SectionTitle'
import EpochBlock, { EpochBlockProps } from '../EpochBlock'
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
const extractEpochs = async (data: any, currentBlockNumber: number) => {
  if (data && data.epoches) {
    const { epoches: epochsHistory } = data
    const epoches = epochsHistory.slice(0, 3)

    const calculateEpochValues = async (epoch: any) => {
      const isCurrent: boolean = epoch.id === data.enigmaState.latestEpoch.id
      const calculatedValues: { finishBlockNumber?: number; pendingTime?: number } = {
        finishBlockNumber: undefined,
        pendingTime: undefined,
      }

      if (isCurrent) {
        const { finishBlockNumber, pendingTime } = await estimateCurrentEpochEnd(epochsHistory)
        calculatedValues.finishBlockNumber = finishBlockNumber
        calculatedValues.pendingTime = pendingTime
      }

      return {
        isCurrent,
        currentBlockNumber,
        ...calculatedValues,
        epoch,
      }
    }

    return Promise.all(epoches.map(calculateEpochValues))
  }
  return []
}
const EpochHomeBlocks = () => {
  const [epochs, setEpochs] = React.useState([])
  const [currentBlockNumber, setCurrentBlockNumber] = React.useState(0)
  const { data, error } = useSubscription(EPOCHS_SUBSCRIPTION, { variables: EPOCHS_INITIAL_VALUES })
  const { data: engState, error: engStateError } = useSubscription(ENG_STATE_SUBSCRIPTION)

  if (error) console.error(error.message)
  if (engStateError) console.error(engStateError.message)

  React.useMemo(() => {
    extractEpochs({ ...data, ...engState }, currentBlockNumber).then(newEpochs => setEpochs(newEpochs as any))
  }, [currentBlockNumber])

  React.useEffect(() => {
    const intervalPtr = setInterval(async () => {
      const actualBlockNumber = await ethApi.getBlockNumber()
      if (actualBlockNumber !== currentBlockNumber) {
        setCurrentBlockNumber(actualBlockNumber)
      }
    }, 1000)

    return () => clearInterval(intervalPtr)
  }, [])

  return (
    <>
      <SectionTitle>Epochs</SectionTitle>
      <EpochsRow>
        {epochs.map((epochProps: EpochBlockProps) => (
          <EpochBlock key={epochProps.epoch.id} {...epochProps} />
        ))}
      </EpochsRow>
    </>
  )
}

export default EpochHomeBlocks
