import { Repository } from "../config/db";
import { ICreateCostumerDTO } from "../dtos/createCostumerDTO";

export default class LandingPageServices {
  private readonly repository = new Repository();

  public async getAllCostumers() {
    try {
      return await this.repository.costumerRepository().findMany({
        select: {
          id: false,
          updated_at: false,
        },
      });
    } catch (e) {
      return e;
    }
  }

  public async findOneCostumer(costumerID: number) {
    try {
      return await this.repository.costumerRepository().findFirst({
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
      if (
        !data.full_name ||
        !data.graduation ||
        !data.phone ||
        !data.promotion_name ||
        !data.promotion_price ||
        !data.promotion_quantity
      ) {
        throw new Error("Todos os campos são necessarios");
      }

      const newCostumer = await this.repository.costumerRepository().create({
        data: data,
      });

      return newCostumer;
    } catch (e) {
      return e;
    }
  }

  public async deleteCostumer(costumerID: number) {
    try {
      await this.repository.costumerRepository().delete({
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
