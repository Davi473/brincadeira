import AtivoService from "../Ativo/Service";
import LancamentoController from "./Lancamento";
import LancamentoDAO, { LancamentoDAOMemoria } from "./Repository";
import { Express } from "express";
import LancamentoService from "./Service";
import DBConnect from "../Config/DBConfig";

export default class LancamentoModule
{   
    private repository: LancamentoDAO;
    private service: LancamentoService;
    private controller: LancamentoController;

    constructor(
        private api: Express,
        private connection: DBConnect,
        private serviceAtivo: AtivoService
    ) {
        this.repository = new LancamentoDAOMemoria();
        this.service = new LancamentoService(this.repository, this.serviceAtivo);
        this.controller = new LancamentoController(this.api, this.service);
    }
}