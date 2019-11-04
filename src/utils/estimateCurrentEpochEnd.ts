import ethApi from './eth'
import { EpochBasicData } from '../components/Epochs/types'

/**
 * Calculates the distance in ranges values
 * @param { [number, number][] } ranges - list of ranges in ascending order
 * @returns { number[] }
 */
const calculateRangesDurations = (ranges: [number, number][]) => {
  const acc = []

  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i]
    acc.push(range[1] - range[0])
  }

  return acc
}

const distanceMedian = (ranges: [number, number][]) => {
  const durations = calculateRangesDurations(ranges)
  const length = durations.length

  if (length === 0) return length

  durations.sort((a, b) => a - b)

  const half = Math.floor(length / 2)

  return length % 2 ? durations[half] : Math.floor((durations[half - 1] + durations[half]) / 2)
}

const distanceAverage = (ranges: [number, number][]) => {
  const durations = calculateRangesDurations(ranges)
  const length = durations.length

  if (!length) return 0

  const sum = durations.reduce((a, b) => a + b)
  return Math.floor(sum / length)
}

export interface EstimatesCurrentEpochEnd {
  pendingTime: number
  finishBlockNumber: number
}

/**
 * Calculates the estimate finish time and block for the current Epoch, based on historic data.
 * @param { EpochBasicData[] } epochs - list of Epochs (Entity returned by the Subgraph)
 * @param { boolean } average
 * @returns Promise<EstimatesCurrentEpochEnd>
 */
const estimateCurrentEpochEnd = async (
  epochs?: EpochBasicData[],
  average = false,
): Promise<EstimatesCurrentEpochEnd> => {
  let pendingTime = 0 // estimated life time for the current epoch
  let finishBlockNumber = 0 // estimated block for when the current epoch may end

  if (!epochs) return { pendingTime, finishBlockNumber }

  const sortedEpochs = epochs.sort((a, b) => +b.id - +a.id) // sort from newest to oldest
  const currentEpoch = sortedEpochs.slice(0, 1)[0] // currently active epoch

  // builds an array of the form [1, 10, 11, 21, 22, 40]
  // where 10 is the last block of the first epoch in the collection
  // and 1 is the first block of the first epoch in the collection
  // 21 is the last block of the second epoch and 11 is it's first block and so on
  const blocksRange = sortedEpochs
    .reduce((acc: [number, number][], epoch, index) => {
      if (index !== 0) {
        acc.push([+epoch.startBlockNumber, +epoch.endBlockNumber])
      }

      return acc
    }, [])
    .reverse()

  try {
    const [currentBlock, epochsTimestamps]: [number, number[]] = await Promise.all([
      ethApi.getBlockNumber(),
      ethApi.getBatchBlocksTimestamps(blocksRange.flat()),
    ])

    const epochsRangesTimestamps = epochsTimestamps.reduce((acc: [number, number][], block, index, blocks) => {
      if (index % 2) {
        acc.push([blocks[index - 1], block])
      }
      return acc
    }, [])

    const epochBlockCount = average ? distanceAverage(blocksRange) : distanceMedian(blocksRange)
    const epochDuration = average ? distanceAverage(epochsRangesTimestamps) : distanceMedian(epochsRangesTimestamps)
    finishBlockNumber = +currentEpoch.startBlockNumber + epochBlockCount
    const currentBlocksLeft = finishBlockNumber - +currentBlock
    const currentBlocksTimes = epochDuration / epochBlockCount
    pendingTime = Math.floor(currentBlocksLeft * currentBlocksTimes) * 1000 // milliseconds
  } catch (e) {
    console.error('Failed to retrieve blocks timestamps', e)
  }

  return { pendingTime, finishBlockNumber }
}

export default estimateCurrentEpochEnd
