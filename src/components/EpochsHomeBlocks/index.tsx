import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import SectionTitle from '../Common/SectionTitle'
import EpochBlock, { EpochBlockProps } from '../EpochBlock'
import ethApi from '../../utils/eth'
import estimateCurrentEpochEnd from '../../utils/estimateCurrentEpochEnd'
import { EPOCHS_INITIAL_VALUES, EPOCHS_QUERY } from '../Epochs/queries'

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

const EpochHomeBlocks = () => {
  const [epochs, setEpochs] = React.useState([])
  const [currentBlockNumber, setCurrentBlockNumber] = React.useState(0)
  const { data, error, refetch } = useQuery(EPOCHS_QUERY, {
    variables: { ...EPOCHS_INITIAL_VALUES },
    fetchPolicy: 'cache-and-network',
  })

  if (error) console.error(error.message)

  const calculateEpochsValues = async (epochsHistory: Array<any>, epoch: any) => {
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

  const extractEpochs = async () => {
    if (!data) return

    const { epoches: epochsHistory } = data
    const epoches = epochsHistory.slice(0, 3)
    const newEpochs = await Promise.all(epoches.map(calculateEpochsValues.bind(calculateEpochsValues, epochsHistory)))

    setEpochs(newEpochs as any)
  }

  React.useEffect(() => {
    const intervalPtr = setInterval(async () => {
      setCurrentBlockNumber(await ethApi.getBlockNumber())
    }, 1000)

    return () => clearInterval(intervalPtr)
  }, [])

  React.useMemo(() => {
    refetch({ ...EPOCHS_INITIAL_VALUES })
    extractEpochs()
  }, [currentBlockNumber])

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
