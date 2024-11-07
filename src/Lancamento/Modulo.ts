import AtivoService from "../Ativo/Service";
import LancamentoAPI from "./Lancamento";
import LancamentoDAO from "./Repository";

export default class LancamentoModulo
{   
    private service: LancamentoModulo;
    private repository: LancamentoDAO;
    private api: LancamentoAPI;

    constructor(
        private serviceAtivo: AtivoService
    ) {
        
    }
}