import { Express } from "express";
import AtivoController from "./Ativo";
import AtivoDAO, { AtivoDAOMemoria } from "./Repository";
import AtivoService from "./Service";

export default class AtivoModule
{   
    private repository: AtivoDAO;
    private service: AtivoService;
    private controller: AtivoController;

    constructor(
        private api: Express,
    ) {
        this.repository = new AtivoDAOMemoria();
        this.service = new AtivoService(this.repository);
        this.controller = new AtivoController(this.api, this.service);
    }

    isService()
    {
      return this.service;
    }
}