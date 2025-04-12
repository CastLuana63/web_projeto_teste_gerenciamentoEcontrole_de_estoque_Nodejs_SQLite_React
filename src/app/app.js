import express from "express";
import routes from "../routes/routes.js";
import cors from "cors";

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(cors({ origin: "http://localhost:5173" }));
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
