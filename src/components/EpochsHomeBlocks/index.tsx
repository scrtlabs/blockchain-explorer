import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import humanizeDuration from 'humanize-duration'
import SectionTitle from '../Common/SectionTitle'
import EpochBlock, {EpochProps, ValuesProps} from '../EpochBlock'
import { GET_RECENT_EPOCHS } from '../../utils/subgrah-queries'

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

const shortEngHumanizer = humanizeDuration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      y: () => 'y',
      mo: () => 'mo',
      w: () => 'w',
      d: () => 'd',
      h: () => 'h',
      m: () => 'm',
      s: () => 's',
      ms: () => 'ms',
    },
  },
  round: true,
  largest: 2,
  spacer: '',
  conjunction: ' ',
})

const estimateEpochFinishTime = (epoch: EpochProps) => {
  // TODO: properly estimate FinishTime based on blocks times
  return shortEngHumanizer(122312, { largest: 3 })
}

const EpochHomeBlocks = () => {
  const [epochs, setEpochs] = React.useState([])
  const { data, error, loading } = useQuery(GET_RECENT_EPOCHS, { variables: { total: 3 } })

  React.useEffect(() => {
    if (!loading && !error && data) {
      const { epoches } = data

      setEpochs(
        epoches.map((epoch: any, index: number) => {
          const current = index === 0

          return {
            values: {
              current,
              epoch: epoch.id,
              time: current
                ? estimateEpochFinishTime(epoch)
                : shortEngHumanizer(Date.now() - (new Date(epoch.startTime * 1000) as any)) + ' ago',
              progress: '100',
              tasks: '0',
            },
            epoch,
          }
        }),
      )
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
