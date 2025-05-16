import { Router } from "express";
import LandingPageController from "../controller/LandingPageController";

export class LandingPageRouter {
  constructor(
    private readonly router = Router(),
    private readonly controller = new LandingPageController()
  ) {
    this.routes();
  }

  public routes() {
    this.router.get("/get/:id", this.controller.get);
    this.router.get("/getAll", this.controller.getAll);
    this.router.post("/create", this.controller.create);
    this.router.delete("/delete/:id", this.controller.delete);
  }

  public get route() {
    return this.router;
  }
}
