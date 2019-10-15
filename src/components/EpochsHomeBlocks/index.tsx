import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import SectionTitle from '../Common/SectionTitle'
import EpochBlock, { ValuesProps } from '../EpochBlock'
import { GET_RECENT_EPOCHS } from '../../utils/subgrah-queries'
import { shortEngHumanizer } from '../../utils/humanizer'
import estimateEpochFinishTime from '../../utils/estimateEpochFinishTime'

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

const mockedValues: ValuesProps = {
  current: true,
  epoch: '123456',
  progress: '92',
  time: '2d 23h 54m',
}

const EpochHomeBlocks = () => {
  const [epochs, setEpochs] = React.useState([
    {
      values: mockedValues,
      epoch: {},
    },
  ])
  const { data, error, loading } = useQuery(GET_RECENT_EPOCHS, { variables: { total: 3 } })

  React.useEffect(() => {
    const extractEpochs = async () => {
      const { epoches } = data

      const newEpochs = await Promise.all(
        epoches.map(async (epoch: any, index: number) => {
          const current = index === 0

          return {
            values: {
              current,
              epoch: epoch.id,
              time: current
                ? shortEngHumanizer(await estimateEpochFinishTime(+epoch.completeBlockNumber), { largest: 3 })
                : shortEngHumanizer(Date.now() - (new Date(epoches[index - 1].startTime * 1000) as any)) + ' ago',
              progress: '100',
              tasks: '0',
            },
            epoch,
          }
        }),
      )

      setEpochs(newEpochs as any)
    }

    if (!loading && !error && data) {
      extractEpochs()
    }
  }, [data, loading])

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
