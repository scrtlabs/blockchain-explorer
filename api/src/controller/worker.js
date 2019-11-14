import Worker from '../model/Worker'
import { findOneAndUpdateOptions } from './options'

export const getWorkers = () => {
  try {
    return Worker.find({})
      .populate('epochs')
      .exec()
  } catch (error) {
    throw new Error('There was an error retrieving the list of workers.')
  }
}

export const getWorker = ({ workerId }) => {
  try {
    return Worker.findOne({ workerId })
      .populate('epochs')
      .exec()
  } catch (error) {
    throw new Error(`There was an error retrieving the worker ${workerId}`)
  }
}

export const createWorker = ({ workerId }) => {
  const worker = new Worker({ workerId })
  return worker.save()
}

export const addEpochToWorker = async ({ workerId, epoch }) => {
  const worker = await Worker.find({ workerId })
  worker.epochs.push(epoch)

  return worker.save()
}

export const updateOrCreateWorker = async ({ workerId, epoch }) => {
  try {
    const worker = await getWorker({ workerId })
    const update = {
      workerId,
      epochs: []
    }

    if (worker) {
      if (epoch && worker.epochs.findIndex(storedEpoch => storedEpoch.id === epoch.id) === -1) {
        update.epochs = [...worker.epochs, epoch]
      } else {
        update.epochs = [...worker.epochs]
      }
    }

    return Worker.findOneAndUpdate({ workerId }, update, findOneAndUpdateOptions).exec()
  } catch (error) {
    throw new Error(`There was an error updating worker ${workerId}:`, error.message)
  }
}
