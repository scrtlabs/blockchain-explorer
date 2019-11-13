import Epoch from '../model/Epoch'
import { findOneAndUpdateOptions } from './options'

export const getEpochs = () => {
  try {
    return Epoch.find({})
      .populate('workers')
      .exec()
  } catch (error) {
    throw new Error('There was an error retrieving the list of epochs:', error.message)
  }
}

export const getEpoch = ({ epochId }) => {
  try {
    return Epoch.findOne({ epochId })
      .populate('workers')
      .exec()
  } catch (error) {
    throw new Error(`There was an error retrieving the epoch ${epochId}:`, error.message)
  }
}

export const updateOrCreateEpoch = async ({ epochId, worker }) => {
  try {
    const epoch = await getEpoch({ epochId })
    const update = {
      epochId,
      workers: []
    }

    if (epoch) {
      if (worker && epoch.workers.findIndex(storedWorker => storedWorker.id === worker.id) === -1) {
        update.workers = [...epoch.workers, worker]
      } else {
        update.workers = [...epoch.workers]
      }
    }

    return Epoch.findOneAndUpdate({ epochId }, update, findOneAndUpdateOptions).exec()
  } catch (error) {
    throw new Error(`There was an error updating epoch ${epochId}:`, error.message)
  }
}

export const createEpoch = ({ epochId }) => {
  const epoch = new Epoch({ epochId })
  return epoch.save()
}

export const addWorkerToEpoch = async ({ epochId, worker }) => {
  const epoch = await Epoch.findOne({ epochId }).exec()
  epoch.workers.push(worker)

  return epoch.save()
}
