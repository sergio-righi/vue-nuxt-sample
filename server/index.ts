
const express = require("express");
const app = express();
const config = require('./app.ts')
const PORT = process.env.PORT || 4000

config.setDatabase()
config.setConfiguration(app, express)
config.setRoutes(app)
config.setMiddleware(app)

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`)
})
