import AtivoService from "../Ativo/Service";
import LancamentoController from "./Lancamento";
import LancamentoDAO, { LancamentoDAOMemoria } from "./Repository";
import LancamentoService from "./Service";
import DBConnect from "../Config/DBConnect/DBConnect";
import ApiHttp from "../Config/ApiHttp/ApiHttp";
import CarteiraService from "../Carteira/Service";

export default class LancamentoModule
{   
    private repository: LancamentoDAO;
    private service: LancamentoService;
    private controller: LancamentoController;

    constructor(
        private api: ApiHttp,
        private connection: DBConnect,
        private serviceAtivo: AtivoService,
        private serviceCarteira: CarteiraService
    ) {
        this.repository = new LancamentoDAOMemoria(this.connection);
        this.service = new LancamentoService(this.repository, this.serviceAtivo, this.serviceCarteira);
        this.controller = new LancamentoController(this.api, this.service);
    }
}