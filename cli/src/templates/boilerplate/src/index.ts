
import express from 'express'
import cors from 'cors'
import { NimbusApp } from '@zup-it/nimbus-backend-express'
import { setupHotReloading } from '@zup-it/nimbus-backend-core'
import configs from '../nimbus-ts.json'
import { routes } from './screens'

const expressApp = express()
expressApp.use(cors()).use(express.json())
expressApp.listen(configs.port, () => {
  console.log(`App listening at http://localhost:${configs.port}`)
  setupHotReloading()
})

new NimbusApp(expressApp, routes, { basePath: configs.basePath })
