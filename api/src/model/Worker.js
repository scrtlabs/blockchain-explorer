import { Schema, model } from 'mongoose'

const WorkerSchema = Schema({
  workerId: String,
  epochs: [{ type: Schema.Types.ObjectId, ref: 'Epoch' }]
})

export default model('Worker', WorkerSchema)
