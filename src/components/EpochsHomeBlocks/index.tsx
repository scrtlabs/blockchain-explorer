import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import SectionTitle from '../Common/SectionTitle'
import EpochBlock, { ValuesProps } from '../EpochBlock'
import { GET_RECENT_EPOCHS, SUBSCRIBE_RECENT_EPOCHS } from '../../utils/subgrah-queries'
import { shortEngHumanizer } from '../../utils/humanizer'
import ethApi from '../../utils/eth'
import estimateEpochFinishTimes from '../../utils/estimateEpochFinishTime'
import { EpochBlockTypes } from '../EpochBlockNumbers'

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

const EpochHomeBlocksMockedData = [
  {
    values: {
      current: true,
      epoch: '123456',
      progress: '92',
      time: '2d 23h 54m',
      tasks: '1',
      finishTime: Date.now(),
      blocks: [
        { value: '11111111', title: 'First Block', type: EpochBlockTypes.first },
        { value: '55555555', title: 'Current Block', type: EpochBlockTypes.current },
        { value: '99999999', title: 'Last Block', type: EpochBlockTypes.last },
      ],
    },
    epoch: {},
  },
  {
    values: {
      current: false,
      epoch: '789101',
      progress: '72.38',
      time: '4d 19h 23m',
      tasks: '3',
      blocks: [
        { value: '00000111', title: 'First Block', type: EpochBlockTypes.first },
        { value: '00000888', title: 'Last Block', type: EpochBlockTypes.last },
      ],
    },
    epoch: {},
  },
]

const EpochHomeBlocks = () => {
  const [epochs, setEpochs] = React.useState(EpochHomeBlocksMockedData)
  const [currentBlock, setCurrentBlock] = React.useState(0)
  const { subscribeToMore, data, error, loading } = useQuery(GET_RECENT_EPOCHS, { variables: { total: 8 } })

  const calculateEpochsValues = async (epochsHistory: Array<any>, epoch: any, index: number, epochs: Array<any>) => {
    const current = index === 0
    const calculatedValues: { finishTime: number; time: string; blocks: any[] } = {
      finishTime: 0,
      time: '',
      blocks: [],
    }

    calculatedValues.blocks.push({
      value: epoch.startBlockNumber,
      title: 'First Block',
      type: EpochBlockTypes.first,
    })

    if (current) {
      const actualBlock = await ethApi.getBlockNumber()
      calculatedValues.blocks.push({ value: actualBlock, title: 'Current Block', type: EpochBlockTypes.current })

      const { finishBlock, finishTime } = await estimateEpochFinishTimes(epochsHistory)
      calculatedValues.finishTime = finishTime
      calculatedValues.time = shortEngHumanizer(finishTime)
      const lastBlock = finishBlock > currentBlock ? finishBlock : currentBlock
      calculatedValues.blocks.push({ value: lastBlock, title: 'Last Block', type: EpochBlockTypes.last })
    } else {
      const nextEpochStartTime = new Date(epochs[index - 1].startTime * 1000) as any
      calculatedValues.time = shortEngHumanizer(Date.now() - nextEpochStartTime)

      const finishBlock = `${+epochs[index - 1].startBlockNumber - 1}`
      calculatedValues.blocks.push({ value: finishBlock, title: 'LastBlock', type: EpochBlockTypes.last })
    }

    return {
      values: {
        current,
        epoch: epoch.id,
        progress: `${+epoch.tasksCount !== 0 ? +(+epoch.tasksCompletedCount / +epoch.tasksCount).toFixed(2) * 100 : 0}`,
        tasks: epoch.tasksCount,
        ...calculatedValues,
      },
      epoch,
    }
  }

  const extractEpochs = async () => {
    const { epoches: epochsHistory } = data
    const epoches = epochsHistory.slice(0, 3)

    const newEpochs = await Promise.all(epoches.map(calculateEpochsValues.bind(calculateEpochsValues, epochsHistory)))

    setEpochs(newEpochs as any)
  }

  React.useEffect(() => {
    if (!loading && !error) {
      extractEpochs()
    }

    return subscribeToMore({
      document: SUBSCRIBE_RECENT_EPOCHS,
      variables: { total: 8 },
      updateQuery: (prev, { subscriptionData }) => (subscriptionData.data ? subscriptionData.data : prev),
    })
  }, [])

  React.useMemo(() => {
    if (data) {
      extractEpochs()
    }
  }, [data])

  React.useEffect(() => {
    const intervalPtr = setInterval(async () => {
      setCurrentBlock(+(await ethApi.getBlockNumber()))
    }, 1000)
    return () => clearInterval(intervalPtr)
  }, [])

  React.useMemo(() => {
    if (data) {
      extractEpochs()
    }
  }, [currentBlock])

  return (
    <>
      <SectionTitle>Epochs</SectionTitle>
      <EpochsRow>
        {epochs.map(({ values, epoch }: { values: ValuesProps; epoch: any }) => (
          <EpochBlock values={values} key={values.epoch} epoch={epoch} />
        ))}
      </EpochsRow>
    </>
  )
}

export default EpochHomeBlocks
