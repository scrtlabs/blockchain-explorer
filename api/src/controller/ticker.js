import Ticker from '../model/Ticker'
import { findOneAndUpdateOptions } from './options'

export const getTicker = () => {
  try {
    return Ticker.findOne({}).exec()
  } catch (error) {
    throw new Error('There was an error retrieving the ENG ticker:', error.message)
  }
}

export const updateOrCreateTicker = update => {
  try {
    return Ticker.findOneAndUpdate({}, update, findOneAndUpdateOptions).exec()
  } catch (error) {
    throw new Error('There was an error updating the ENG ticker:', error.message)
  }
}
