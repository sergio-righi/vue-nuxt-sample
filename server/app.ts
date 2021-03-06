import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import compression from 'compression'

import { env } from '@/utils'
import { UserRoute } from '@/routes'

class App {
  public express: any

  constructor() {
    this.express = express()

    this.setDatabase()
    this.setConfiguration()
    this.setRoutes()

    this.getMemoryUsage()
  }

  getMemoryUsage() {
    const used = process.memoryUsage()
    for (let key in used) {
      console.log(
        `${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`
      )
    }
  }

  setDatabase() {
    mongoose.connect(env.get('mongoose'), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    const databaseConnection = mongoose.connection
    databaseConnection.on(
      'error',
      console.error.bind(console, 'MongoDB Connection error')
    )
  }

  setConfiguration() {
    this.express.use(express.json({ limit: '10mb' }))
    this.express.use(
      cors({
        credentials: true,
        origin: env.get('cors')
      })
    )
    this.express.use(compression())
    this.express.use(express.urlencoded({ extended: true }))
  }

  setRoutes() {
    this.express.use('/users', UserRoute)
  }
}

export default new App().express
