import { Request, Response } from "express";
import LandingPageServices from "../services/LandingPageServices";
import { ICreateCostumerDTO } from "../dtos/createCostumerDTO";

export default class LandingPageController {
  constructor(private readonly service = new LandingPageServices()) {}

  public async getAll(req: Request, res: Response) {
    try {
      const costumers = await this.service.getAllCostumers();
      res
        .send({
          leads: costumers,
          status: "success",
          statusCode: 200,
        })
        .status(200);
    } catch (e) {
      res
        .send({
          message: "Falha ao pegar todos os usuarios",
          status: "error",
          statusCode: 400,
        })
        .status(400);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const costumer = await this.service.findOneCostumer(Number(id));
      res
        .send({
          lead: costumer,
          status: "success",
          statusCode: 200,
        })
        .status(200);
    } catch (e) {
      res
        .send({
          message: "Falha ao pegar o usuario desejado",
          status: "error",
          statusCode: 400,
        })
        .status(400);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const {
        full_name,
        phone,
        graduation,
        promotion_name,
        promotion_price,
        promotion_quantity,
        utm_source,
      }: ICreateCostumerDTO = req.body;

      const data = {
        full_name,
        phone,
        graduation,
        promotion_name,
        promotion_price,
        promotion_quantity,
        utm_source,
      };

      const newCostumer = await this.service.createCostumer(data);
      res
        .send({
          message: "Lead registrado com sucesso",
          lead: newCostumer,
          status: "success",
          statusCode: 201,
        })
        .status(201);
    } catch (e) {
      res
        .send({
          message: "Falha ao registrar o lead no banco de dados",
          status: "error",
          statusCode: 400,
        })
        .status(400);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.service.deleteCostumer(Number(id));
      res
        .send({
          message: "Lead apagado com sucesso",
          status: "success",
          statusCode: 200,
        })
        .status(200);
    } catch (e) {
      res
        .send({
          message: "Falha ao apagar o usuario desejado",
          status: "error",
          statusCode: 400,
        })
        .status(400);
    }
  }
}
