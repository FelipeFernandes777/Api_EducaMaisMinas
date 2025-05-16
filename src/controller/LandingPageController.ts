import { Request, Response } from "express";
import LandingPageServices from "../services/LandingPageServices";
import { ICreateCostumerDTO } from "../dtos/createCostumerDTO";

export default class LandingPageController {
  private readonly service;

  constructor() {
    this.service = new LandingPageServices();
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const costumers = await this.service.getAllCostumers();
      res.status(200).send({
        leads: costumers,
        status: "success",
        statusCode: 200,
      });
    } catch (e) {
      res.status(400).send({
        message: "Falha ao pegar todos os usuarios",
        status: "error",
        statusCode: 400,
      });
    }
  };

  public get = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const costumer = await this.service.findOneCostumer(Number(id));
      res.status(200).send({
        lead: costumer,
        status: "success",
        statusCode: 200,
      });
    } catch (e) {
      res.status(400).send({
        message: "Falha ao pegar o usuario desejado",
        status: "error",
        statusCode: 400,
      });
    }
  };

  public create = async (req: Request, res: Response) => {
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

      console.table(data)

      const newCostumer = await this.service.createCostumer(data);
      res.status(201).send({
        message: "Lead registrado com sucesso",
        lead: newCostumer,
        status: "success",
        statusCode: 201,
      });
    } catch (e) {
      console.error(e); // Log the error for debugging
      res.status(400).send({
        message: e || "Falha ao registrar o lead no banco de dados",
        status: "error",
        statusCode: 400,
      });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await this.service.deleteCostumer(Number(id));
      res.status(200).send({
        message: "Lead apagado com sucesso",
        status: "success",
        statusCode: 200,
      });
    } catch (e) {
      res.status(400).send({
        message: "Falha ao apagar o usuario desejado",
        status: "error",
        statusCode: 400,
      });
    }
  };
}
