import { db } from "../config/db";
import { ICreateCostumerDTO } from "../dtos/createCostumerDTO";

export default class LandingPageServices {
  constructor(  private readonly repository = db) {}

  public async getAllCostumers() {
    try {
      return await db.costumer.findMany();
    } catch (e) {
      return e;
    }
  }

  public async findOneCostumer(costumerID: number) {
    try {
      return await db.costumer.findFirst({
        where: {
          id: costumerID,
        },
      });
    } catch (e) {
      return e;
    }
  }
  public async createCostumer(data: ICreateCostumerDTO) {
    try {
      // if (
      //   !data.full_name ||
      //   !data.graduation ||
      //   !data.phone ||
      //   !data.promotion_name ||
      //   !data.promotion_price ||
      //   !data.promotion_quantity
      // ) {
      //   throw new Error("Todos os campos são necessarios");
      // }

      const newCostumer = await db.costumer.create({
        data: data,
      });

      return newCostumer;
    } catch (e) {
      console.error(e)
      return e;
    }
  }

  public async deleteCostumer(costumerID: number) {
    try {
      await this.repository.costumer.delete({
        where: {
          id: costumerID,
        },
      });

      return true;
    } catch (e) {
      return e;
    }
  }
}