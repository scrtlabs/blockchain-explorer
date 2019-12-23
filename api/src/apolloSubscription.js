import gql from 'graphql-tag'
import JSBI from 'jsbi'
import EnigmaAPI, { ENG_DECIMALS } from './enigma'
import apolloClient from './apolloClient'
import { updateOrCreateEpoch } from './controller/epoch'
import { updateOrCreateWorker } from './controller/worker'

const castToENGInt = amount => `1e${ENG_DECIMALS}` * amount

const epochFragment = gql`
  fragment EpochFragment on Epoch {
    id
    order
    startBlockNumber
    workers {
      id
    }
    stakes
    seed
    deployedSecretContracts
  }
`

async function initApolloSubscription(startAt = 0) {
  apolloClient
  .query({
    query: gql`
      query Epoches($startAt: Int) {
        epoches(first: 1000, skip: $startAt, orderBy: order, orderDirection: asc) {
          ...EpochFragment
        }
      }
      ${epochFragment}
    `,
    fetchPolicy: 'network-only',
    variables: { startAt }
  })
  .then(async ({ data: { epoches } }) => {
    if (epoches.length) {
      for (let epochIndex = 0; epochIndex < epoches.length; epochIndex++) {
        const epoch = epoches[epochIndex]

        const dbEpoch = await updateOrCreateEpoch({ epochId: epoch.id })

        const params = {
          firstBlockNumber: parseInt(epoch.startBlockNumber),
          seed: JSBI.BigInt(castToENGInt(epoch.seed)),
          workers: epoch.workers.map(({ id }) => id),
          stakes: epoch.stakes.map(stake => JSBI.BigInt(castToENGInt(stake)))
        }

        const selectedWorkers = []

        if (epoch.deployedSecretContracts) {
          for (let scIndex = 0; scIndex < epoch.deployedSecretContracts.length; scIndex++) {
            const scAddr = epoch.deployedSecretContracts[scIndex]
            const _selectedWorkers = await EnigmaAPI.enigma.selectWorkerGroup(
              scAddr,
              params,
              params.workers.length
            )
            const selectedWorker = _selectedWorkers[0]
            selectedWorkers.push(selectedWorker)
          }
        }

        const uniqueSelectedWorkers = selectedWorkers.length
          ? Array.from(new Set(selectedWorkers))
          : selectedWorkers

        for (let workerIndex = 0; workerIndex < uniqueSelectedWorkers.length; workerIndex++) {
          const selectedWorker = uniqueSelectedWorkers[workerIndex]
          const worker = await updateOrCreateWorker({
            workerId: selectedWorker,
            epoch: dbEpoch
          })
          await updateOrCreateEpoch({ epochId: epoch.id, worker })
        }
      }
      return epoches[epoches.length - (epoches.length > 1 ? 2 : 1)].order
    }
  })
  .then((order = '0') => setTimeout(async () => await initApolloSubscription(+order), 5000))
  .catch(console.error)
}

export default initApolloSubscription
