import AtivoController from "./Ativo";
import AtivoDAO, { AtivoDAOMemoria } from "./Repository";
import AtivoService from "./Service";
import DBConnect from "../Config/DBConnect/DBConnect";
import ApiHttp from "../Config/ApiHttp/ApiHttp";

export default class AtivoModule
{   
    private repository: AtivoDAO;
    private service: AtivoService;
    private controller: AtivoController;

    constructor(
        private api: ApiHttp,
        private connection: DBConnect
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