import { PrismaClient } from "../../generated/prisma";

export class Repository {
  constructor(private readonly db = new PrismaClient()){}
  public costumerRepository () {
    return this.db.costumer;
  }
}