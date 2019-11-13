import Koa from 'koa'
import logger from 'koa-logger'
import helmet from 'koa-helmet'
import cors from '@koa/cors'
import Router from '@koa/router'
import Boom from '@hapi/boom'
import fetch from 'node-fetch'
import initDB from './db'
import initApolloSubscription from './apolloSubscription'
import { getTicker, updateOrCreateTicker } from './controller/ticker'
import { getWorker, getWorkers } from './controller/worker'
import { getEpochs, getEpoch } from './controller/epoch'
import config from './config/constants'

const TIME_WINDOW = 3 * 60 * 1000

const fetchTicker = async () => {
  const ticker = (await (await fetch('https://api.coinmarketcap.com/v1/ticker/enigma/').catch(
    console.error
  )).json())[0]

  if (!ticker) {
    throw new Error('There was an error fetching ticker info')
  }

  return await updateOrCreateTicker(ticker)
}

const app = new Koa()
const router = new Router()

initDB().then(() => initApolloSubscription())

router
  .get('/', ctx => {
    ctx.body = 'Enigma Explorer API'
  })
  .get('ticker', '/ticker', async ctx => {
    const ticker = await getTicker()

    if (ticker) {
      const lastUpdate = ticker.last_updated * 1000

      if (Date.now() - lastUpdate > TIME_WINDOW) {
        ctx.body = await fetchTicker()
      } else {
        ctx.body = ticker
      }
    } else {
      ctx.body = await fetchTicker()
    }
  })
  .get('epochs', '/epochs', async ctx => {
    const epochs = await getEpochs()

    ctx.body = epochs
      .map(epoch => ({
        [epoch.epochId]: epoch.workers.map(({ workerId }) => `${workerId}`)
      }))
      .reduce((acc, epoch) => ({ ...acc, ...epoch }), {})
  })
  .get('epoch', '/epochs/:id', async ctx => {
    const epoch = await getEpoch({ epochId: ctx.params.id })

    // eslint-disable-next-line require-atomic-updates
    ctx.body = epoch.workers.map(({ workerId }) => `${workerId}`)
  })
  .get('workers', '/workers', async ctx => {
    const workers = (await getWorkers()) || []

    ctx.body = workers
      .map(worker => ({
        [worker.workerId]: worker.epochs.map(({ epochId }) => `${epochId}`)
      }))
      .reduce((acc, worker) => ({ ...acc, ...worker }), {})
  })
  .get('worker', '/workers/:id', async ctx => {
    const worker = await getWorker({ workerId: ctx.params.id })

    // eslint-disable-next-line require-atomic-updates
    ctx.body = worker.epochs.map(({ epochId }) => `${epochId}`)
  })

app
  .use(logger())
  .use(helmet())
  .use(cors())
  .use(router.routes())
  .use(
    router.allowedMethods({
      throw: true,
      notFound: () => () => new Boom.notFound(),
      notImplemented: () => new Boom.notImplemented(),
      methodNotAllowed: () => new Boom.methodNotAllowed()
    })
  )
  .use(errorHandler())

function errorHandler() {
  return async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      ctx.status = 500
      ctx.body = 'internal server error'
      app.emit('error', error, ctx)
    }
  }
}

app.listen(config.enigma.apiPort, () => {
  console.log(`Started on port ${config.enigma.apiPort}`)
})
