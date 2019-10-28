import ethApi from './eth'
import { EpochProps } from '../components/Epochs'

const calculateRangesDurations = (range: number[]) => {
  const acc = []

  for (let i = 0; i < range.length; i += 2) {
    const rangeElement = range[i]
    acc.push(rangeElement - range[i + 1])
  }

  return acc
}

const distanceMedian = (range: number[]) => {
  const durations = calculateRangesDurations(range)
  const length = durations.length

  if (length === 0) return length

  durations.sort((a, b) => a - b)

  const half = Math.floor(length / 2)

  return length % 2 ? durations[half] : Math.floor((durations[half - 1] + durations[half]) / 2)
}

const distanceAverage = (range: number[]) => {
  const durations = calculateRangesDurations(range)
  const length = durations.length

  if (!length) return 0

  const sum = durations.reduce((a, b) => a + b)
  return Math.floor(sum / length)
}

export interface EstimatesCurrentEpochEnd {
  pendingTime: number
  finishBlockNumber: number
}

const estimateCurrentEpochEnd = async (epochs?: EpochProps[], average = false): Promise<EstimatesCurrentEpochEnd> => {
  let pendingTime = 0 // estimated life time for the current epoch
  let finishBlockNumber = 0 // estimated block for when the current epoch may end

  if (!epochs) return { pendingTime, finishBlockNumber }

  const sortedEpochs = epochs.sort((a, b) => +b.id - +a.id)
  const currentEpoch = sortedEpochs.slice(0, 1)[0] // currently active epoch

  // builds an array of the form [10, 1, 21, 11, 40, 22]
  // where 10 is the last block of the first epoch in the collection
  // and 1 is the first block of the first epoch in the collection
  // 21 is the last block of the second epoch and 11 is it's first block and so on
  const blocksRange = sortedEpochs
    .reduce((acc: number[], epoch, index) => {
      if (index !== 0) {
        acc.push(+epoch.startBlockNumber)
        acc.push(+epoch.endBlockNumber)
      }

      return acc
    }, [])
    .reverse()

  try {
    const [currentBlock, epochsRangesTimestamps] = await Promise.all([
      ethApi.getBlockNumber(),
      ethApi.getBatchBlocksTimestamps(blocksRange),
    ])
    const epochBlockCount = average ? distanceAverage(blocksRange) : distanceMedian(blocksRange)
    const epochDuration = average ? distanceAverage(epochsRangesTimestamps) : distanceMedian(epochsRangesTimestamps)
    finishBlockNumber = +currentEpoch.startBlockNumber + epochBlockCount
    const currentBlocksLeft = finishBlockNumber - +currentBlock
    const currentBlocksTimes = epochDuration / epochBlockCount
    pendingTime = Math.floor(currentBlocksLeft * currentBlocksTimes) * 1000 // milliseconds
  } catch (e) {
    console.error('Failed to retrieve blocks tiemstamps', e)
  }

  return { pendingTime, finishBlockNumber }
}

export default estimateCurrentEpochEnd
