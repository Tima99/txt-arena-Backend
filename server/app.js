require("dotenv").config();
const express = require("express");
const path = require("path");
const routes = require("./routes");
const mongoose = require("mongoose");
const favicon = require('serve-favicon');

const app = express();

const PORT = process.env.PORT || 8888;

// TODO: connection with mongoAtlas and server
const DB = process.env.DBURL || process.env.DBTEST;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Connection stablish with DB | \n Server is running on http://localhost:${PORT}...`
      )
    )
  )
  .catch((error) =>
    console.log(`Error while connecting with server: ${error.message}`)
  );

const staticFilesPath = path.join(__dirname, "./client");
app.use(express.static(staticFilesPath));

// for getting req.body use json and urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const faviconPath = path.join(__dirname , '/client/assets/favicon.ico')
app.use(favicon(faviconPath)); 


app.use("/", routes);
