import express from 'express'
import cors from 'cors'
import { NimbusApp } from '@zup-it/nimbus-backend-express'
import { routes as nimbusRoutes } from './nimbus/screens'
import { applyRoutes } from './routes'
import { setupHotReloading } from '@zup-it/nimbus-backend-core'

const port = 3000
export const expressApp = express()

expressApp.use(cors()).use(express.json())

export const expressListener = expressApp.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
  setupHotReloading()
})

applyRoutes(expressApp)
new NimbusApp(expressApp, nimbusRoutes, { basePath: '' })
