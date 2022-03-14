class App {

  static setDatabase() {
    const env = require("./config/db.ts");
    const mongoose = require("mongoose");
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

  static setConfiguration(app, express) {
    const cors = require("cors");

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
  }

  static setRoutes(app) {
    const todoRoute = require("./api/routes/todo.ts");

    app.use('/todos', todoRoute)
  }

  static setMiddleware(app) {
    const auth = require("./middleware/auth.ts");
    app.use(auth)
  }
}

module.exports = App