import { Schema, model } from 'mongoose'

const EpochSchema = Schema({
  epochId: String,
  workers: [{ type: Schema.Types.ObjectId, ref: 'Worker' }]
})

export default model('Epoch', EpochSchema)
