import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import env from './config/db'
import auth from './middleware/auth'
import { TodoRoute } from './api/routes'

class App {
  public express: express.Application

  constructor() {
    this.express = express()
    this.setDatabase()
    this.setConfiguration()
    this.setRoutes()
    this.setMiddleware()
  }

  private setDatabase(): void {
    const isDev = String(process.env.NODE_ENV).includes('dev')
    const connectionString = isDev
      ? `mongodb://${env.dev.domain}:27017/${env.dev.database}`
      : `mongodb://${env.production.username}:${env.production.password}@${env.production.domain}:27017/${env.production.database}`
    mongoose.connect(connectionString)
    const databaseConnection = mongoose.connection
    databaseConnection.on('error', console.error.bind(console, 'MongoDB Connection error'))
  }

  private setConfiguration(): void {
    this.express.use(cors())
    this.express.use(json())
    this.express.use(urlencoded({ extended: true }))
  }

  private setRoutes(): void {
    this.express.use('/todos', TodoRoute)
  }

  private setMiddleware(): void {
    this.express.use(auth)
  }
}

export default new App().express