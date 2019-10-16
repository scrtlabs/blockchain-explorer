import ethApi from './eth'

const calculateRangesDurations = range => {
  const acc = []

  for (let i = 0; i < range.length; i += 2) {
    const rangeElement = range[i]
    acc.push(rangeElement - range[i + 1])
  }

  return acc
}

const distanceMedian = range => {
  const durations = calculateRangesDurations(range)
  const length = durations.length

  if (length === 0) return length

  durations.sort((a, b) => a - b)

  const half = Math.floor(length / 2)

  return length % 2 ? durations[half] : Math.floor((durations[half - 1] + durations[half]) / 2)
}

const distanceAverage = range => {
  const durations = calculateRangesDurations(range)
  const length = durations.length

  if (!length) return 0

  const sum = durations.reduce((a, b) => a + b)
  return Math.floor(sum / length)
}

const estimateEpochFinishTimes = async (epochs = [], average = false) => {
  let finishTime = 0 // when the current epoch may end
  let finishBlock = 0 // where the current epoch may end
  const currentEpoch = epochs.slice(0, 1)[0] // currently active epoch

  // builds an array of the form [10, 1, 21, 11, 22, 40]
  // where 10 is the last block of the first epoch in the collection
  // and 1 is the first block of the first epoch in the collection
  // 21 is the last block of the second epoch and 11 is it's first block and so on
  const blocksRange = epochs
    .reduce((acc, epoch, index) => {
      const current = index === 0
      if (!current) {
        acc.push(+epoch.startBlockNumber) // start block number for current epoch
        acc.push(+epochs[index - 1].startBlockNumber - 1) // finish block number for current epoch
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

    finishBlock = +currentEpoch.startBlockNumber + epochBlockCount
    const currentBlocksLeft = finishBlock - +currentBlock
    const currentBlocksTimes = epochDuration / epochBlockCount

    finishTime = Math.floor(currentBlocksLeft * currentBlocksTimes) * 1000 // milliseconds
  } catch (e) {
    console.error('Failed to retrieve blocks tiemstamps', e)
  }

  return { finishTime, finishBlock }
}

export default estimateEpochFinishTimes
