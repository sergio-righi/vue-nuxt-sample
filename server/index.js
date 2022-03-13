const express = require("express");
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();
const dev = process.env.NODE_ENV.includes("dev");

// configure mongoose

mongoose
  .connect(
    dev
      ? `mongodb://${config.dev.domain}:27017/${config.dev.database}`
      : `mongodb://${config.production.username}:${config.production.password}@${config.production.domain}:27017/${config.production.database}`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });

// mongoose configuaration ends here

// cors

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware

const auth = require("./middleware/auth");

app.use(auth);

// middleware ends here

// routes
const todoRoute = require("./api/routes/todo");

app.use("/todos", todoRoute);
// routes end here

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});