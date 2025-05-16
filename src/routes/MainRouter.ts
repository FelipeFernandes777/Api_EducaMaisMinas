import { Router } from "express";
import { LandingPageRouter } from "./LandingPageRouter";

export default class MainRouter {
  constructor(
    private readonly landingPageRouter = new LandingPageRouter(),
    private readonly router = Router()
  ) {
    this.manageRoutes();
  }

  public manageRoutes() {
    this.router.get("/", (_, res) => {
      res.send("Hello API").status(200);
    });
    this.router.use("/meta", this.landingPageRouter.route);
  }

  public get routes() {
    return this.router;
  }
}
