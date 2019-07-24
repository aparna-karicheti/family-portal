// Require all dependencies
const port = 4000;

const express = require("express");

const app = express();

const morgan = require("morgan");

const mongoose = require("mongoose");

const server = require("http").createServer(app);

const routes = require('./routes/index');

// Set up middleware. PS: Order of middleware is important!!!!
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("short"));

app.use(routes);

// Start the Database connection
mongoose
  .connect("mongodb://127.0.0.1/awesomeproject", { useNewUrlParser: true })
  .then(() => {
    console.log("Development database connected succesfully");
  })
  .catch(err => {
    console.log("There was an error connecting to the DB", err);
  });

// Start the server  
server.listen(port, err => {
  if (err) {
    process.exit(1);
  }

  console.log(`Server is started on ${port}`);
});
