import mongoose from 'mongoose'
import config from './config/constants'

const initDB = () => {
  return mongoose
    .connect(config.mongo.host, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('MongoDB initialized')

      mongoose.connection.on('error', () => {
        console.error(`Unable to connect to database: ${config.mongo.host}`)
      })
    })
    .catch(error => console.error('failed to connect to DB', error.message))
}

export default initDB
