import ethApi from './eth'

const calculateBlocksDurations = blocksTimestamps => {
  return blocksTimestamps.reduce((acc, curr, idx, arr) => {
    if (isNaN(arr[idx])) return acc // discard errored calls
    if (arr[idx + 1] === undefined) return acc // reached the last item
    acc.push(curr - arr[idx + 1])
    return acc
  }, [])
}

const blocksDurationMedian = blocksTimestamps => {
  const durations = calculateBlocksDurations(blocksTimestamps)
  const length = durations.length

  if (length === 0) return length

  durations.sort((a, b) => a - b)

  const half = Math.floor(length / 2)

  return length % 2 ? durations[half] : Math.floor((durations[half - 1] + durations[half]) / 2)
}

const blocksDurationAverage = blocksTimestamps => {
  const durations = calculateBlocksDurations(blocksTimestamps)
  const length = durations.length

  if (!length) return 0

  const sum = durations.reduce((a, b) => a + b)
  return Math.floor(sum / length)
}

const estimateEpochFinishTime = async (completeBlockNumber, average = true) => {
  const [currentBlock, blocksTimestamps] = await Promise.all([
    ethApi.getBlockNumber(),
    ethApi.getLatestBlocksTimestamps(30),
  ])
  const pendingBlocks = completeBlockNumber - currentBlock
  const pendingTime = average ? blocksDurationAverage(blocksTimestamps) : blocksDurationMedian(blocksTimestamps)

  return pendingBlocks * pendingTime * 1000
}

export default estimateEpochFinishTime
