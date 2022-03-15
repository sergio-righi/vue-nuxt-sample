import mongoose from "mongoose";
import express from 'express';
import cors from 'cors';

import env from "./config/db";
import auth from "./middleware/auth";

import { TodoRoute } from "./api/routes";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setDatabase();
    this.setConfiguration();
    this.setMiddleware();
    this.setRoutes();
  }

  setDatabase() {
    const isDev = String(process.env.NODE_ENV).includes('dev')
    const connectionString = isDev
      ? `mongodb://${env.dev.domain}:27017/${env.dev.database}`
      : `mongodb://${env.production.username}:${env.production.password}@${env.production.domain}:27017/${env.production.database}`
    mongoose.connect(connectionString, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    })
    const databaseConnection = mongoose.connection
    databaseConnection.on('error', console.error.bind(console, 'MongoDB Connection error'))
  }

  setConfiguration() {
    this.express.use(cors())
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: true }))
  }

  setRoutes() {
    this.express.use('/', TodoRoute)
  }

  setMiddleware() {
    this.express.use(auth)
  }
}

export default new App().express