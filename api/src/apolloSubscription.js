import gql from 'graphql-tag'
import JSBI from 'jsbi'
import EnigmaAPI from './enigma'
import apolloClient from './apolloClient'
import { updateOrCreateEpoch } from './controller/epoch'
import { updateOrCreateWorker } from './controller/worker'

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

function initApolloSubscription() {
  apolloClient
    .subscribe({
      query: gql`
        subscription Epoches {
          epoches(orderBy: order, orderDirection: asc) {
            ...EpochFragment
          }
        }
        ${epochFragment}
      `,
      fetchPolicy: 'network-only'
    })
    .subscribe({
      next: async ({ data: { epoches } }) => {
        if (epoches) {
          for (let epochIndex = 0; epochIndex < epoches.length; epochIndex++) {
            const epoch = epoches[epochIndex]

            const dbEpoch = await updateOrCreateEpoch({ epochId: epoch.id })

            const params = {
              firstBlockNumber: parseInt(epoch.startBlockNumber),
              seed: JSBI.BigInt(epoch.seed),
              workers: epoch.workers.map(({ id }) => id),
              stakes: epoch.stakes.map(stake => JSBI.BigInt(stake))
            }

            const selectedWorkers = []

            if (epoch.deployedSecretContracts !== null) {
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
        }
      },
      error: error => console.error('subscription to Epochs failed', error.message),
      complete: () => console.log('subscription to Epochs completed')
    })
}

export default initApolloSubscription
