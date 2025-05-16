import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import MainRouter from "./routes/MainRouter";

export default class Aplication {
  private readonly routes = new MainRouter();
  public constructor(private readonly app = express()) {
    dotenv.config();
    this.configServer();
    this.ManageRoutes();
  }

  private configServer() {
    this.app.use(express.json());
    this.app.use(cors({
      allowedHeaders: ['Content-Type', 'Authorization'],
      methods: ["GET", "POST", "UPDATE", "DELETE"],
      origin: "*",
    }));
  }

  public listen(port: number, message?: string) {
    this.app.listen(port, () => {
      console.log(message);
    });
  }

  private ManageRoutes() {
    this.app.use(this.routes.routes);
  }
}
