import AtivoService from "../Ativo/Service";
import CarteiraController from "./Carteira";
import CarteiraDAO, { CarteiraDAOMemoria } from "./Repository";
import { Express } from "express";
import CarteiraService from "./Service";
import DBConnect from "../Config/DBConfig";

export default class CarteiraModule
{   
    private repository: CarteiraDAO;
    private service: CarteiraService;
    private controller: CarteiraController;

    constructor(
        private api: Express,
        private connection: DBConnect,
        private serviceAtivo: AtivoService
    ) {
        this.repository = new CarteiraDAOMemoria();
        this.service = new CarteiraService(this.repository, this.serviceAtivo);
        this.controller = new CarteiraController(this.api, this.service);
    }
}