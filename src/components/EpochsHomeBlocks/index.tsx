import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import SectionTitle from '../Common/SectionTitle'
import EpochBlock, { ValuesProps } from '../EpochBlock'
import { GET_RECENT_EPOCHS } from '../../utils/subgrah-queries'
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
  const { data, error, loading } = useQuery(GET_RECENT_EPOCHS, { variables: { total: 8 } })

  const calculateEpochsValues = async (epochsHistory: Array<any>, epoch: any, index: number, epochs: Array<any>) => {
    const current = index === 0
    const calculatedValues: { time: string; blocks: any[] } = {
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
      calculatedValues.time = shortEngHumanizer(finishTime, { largest: 3 })
      calculatedValues.blocks.push({ value: finishBlock, title: 'Last Block', type: EpochBlockTypes.last })
    } else {
      const nextEpochStartTime = new Date(epochs[index - 1].startTime * 1000) as any
      calculatedValues.time = shortEngHumanizer(Date.now() - nextEpochStartTime) + ' ago'

      const finishBlock = `${+epochs[index - 1].startBlockNumber - 1}`
      calculatedValues.blocks.push({ value: finishBlock, title: 'LastBlock', type: EpochBlockTypes.last })
    }

    return {
      values: {
        current,
        epoch: epoch.id,
        progress: '100',
        tasks: '0',
        ...calculatedValues,
      },
      epoch,
    }
  }

  React.useMemo(() => {
    const extractEpochs = async () => {
      const { epoches: epochsHistory } = data
      const epoches = epochsHistory.slice(0, 3)

      const newEpochs = await Promise.all(epoches.map(calculateEpochsValues.bind(calculateEpochsValues, epochsHistory)))

      setEpochs(newEpochs as any)
    }

    if (!loading && !error) {
      extractEpochs()
    }
  }, [loading])

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
