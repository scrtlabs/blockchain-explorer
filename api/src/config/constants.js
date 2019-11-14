import Joi from '@hapi/joi'
import dotenv from 'dotenv'

dotenv.config()

const envVarsSchema = Joi.object({
  MONGO_HOST: Joi.string()
    .required()
    .description('MongoDB host URL'),
  MONGO_PORT: Joi.number()
    .default(27017)
    .description('MongoDB port'),
  MONGO_DATABASE: Joi.string()
    .required()
    .description('MongoDB database name'),
  SUBGRAPH_NAME: Joi.string()
    .required()
    .description('Subgraph Name'),
  SUBGRAPH_HTTP: Joi.string()
    .required()
    .description('Subgraph HTTP host'),
  SUBGRAPH_WS: Joi.string()
    .required()
    .description('Subgraph WebSocket host'),
  ETH_NETWORK_ID: Joi.number().description('Ethereum network ID'),
  ETH_RPC_URL: Joi.string().description('Ethereum RPC URL'),
  ENIGMA_CONTRACT_ADDRESS: Joi.string()
    .required()
    .description('Enigma Contract address deployed in the Ethereum network'),
  ENIGMA_TOKEN_ADDRESS: Joi.string()
    .required()
    .description('Enigma Token Contract address deployed in the Ethereum network'),
  ENIGMA_RPC_URL: Joi.string()
    .required()
    .description('Enigma p2p network address for RPC calls'),
  ENIGMA_API_PORT: Joi.number()
    .required()
    .description('Enigma API port')
})
  .unknown()
  .required()

const { error, value: envVars } = envVarsSchema.validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const subgraphName = `subgraphs/name/${envVars.SUBGRAPH_NAME}`

const config = {
  mongo: {
    host: `${envVars.MONGO_HOST}:${envVars.MONGO_PORT}/${envVars.MONGO_DATABASE}`,
    database: envVars.MONGO_DATBASE,
    port: envVars.MONGO_PORT
  },
  subgraph: {
    websocketURI: `${envVars.SUBGRAPH_WS}/${subgraphName}`,
    httpURI: `${envVars.SUBGRAPH_HTTP}/${subgraphName}`
  },
  eth: {
    id: envVars.ETH_NETWORK_ID,
    url: envVars.ETH_RPC_URL
  },
  enigma: {
    enigmaContractAddress: envVars.ENIGMA_CONTRACT_ADDRESS,
    enigmaTokenAddress: envVars.ENIGMA_TOKEN_ADDRESS,
    url: envVars.ENIGMA_RPC_URL,
    apiPort: envVars.ENIGMA_API_PORT
  }
}

export default config
