// maybe somemore Dependencies
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

// defaule or env port
const PORT = process.env.PORT || 3000;

class Archive {
  constructor() {
    this.init();
  }
  init() {
    this.setMiddleware();
    this.setDatabase();
    this.setControllers();
    this.setRoutes();
    this.initiateServer();
  }

  setMiddleware() {
    // some middlewares
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
  }

  setDatabase() {
    // database init and connection
    this.dbConfig = require("./database/dbConfig")().db;
  }

  setControllers() {
    // the controllers
    this.userController = require("./controllers/users")(this.dbConfig);
    this.libraryController = require("./controllers/Library")(this.dbConfig);
  }

  setRoutes() {
    // the routes
    const userRoute = require("./routes/users")(this.userController);
    const libraryRoute = require("./routes/Library")(this.libraryController);
    app.use("/users", userRoute.route());
    app.use("/library", libraryRoute.route());
  }

  initiateServer() {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

new Archive();

// export the express apiss
module.exports = app;
