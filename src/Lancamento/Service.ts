import LancamentoDAO from "./Repository";
import AtivoService from "../Ativo/Service";
import CarteiraService from "../Carteira/Service";
import Lancamento from "./ObjectLancamento";

export default class LancamentoService
{
    constructor (
        private repository: LancamentoDAO,
        private serviceAtivo: AtivoService,
        private serviceCarteira: CarteiraService
    ) {}

    async post (userId: string, lancamento: any)
    {
        if (lancamento.quantidade < 0) throw new Error("Lançamento não possui quantidade");
        if (lancamento.preco < 0) throw new Error("Lançamento não posssui valor");
        if (!lancamento.data) throw new Error("Não tem data");
        if (lancamento.compra !== true && lancamento.compra !== false) throw new Error("Não possui ordem de compra ou venda");
        if (!lancamento.id) throw new Error("Lançamento sem id");
        this.serviceAtivo.existAtivo(lancamento.id);
        const _lancamento = new Lancamento(lancamento);
        await this.repository.insert(_lancamento);
        const carteira = await this.serviceCarteira.recalcularMedia(userId, lancamento.id);
        return carteira;
    }

    async get (userId: string)
    {
        return await this.repository.select({id_user: userId});
    }

    async getID (userId: string, lancamentoId: string)
    {
        return this.existeLancamento(userId, lancamentoId);
    }

    async getAtivo (userId: string, id_ativo: string) 
    {
        return await this.repository.select({id_user: userId, id_ativo: id_ativo});
    }

    async delete (userId: string, lancamento: any)
    {
        this.existeLancamento(userId, lancamento.id);
        await this.repository.delete(userId, lancamento.id);
    }

    async put (userId: string, lancamento: any)
    {
        this.existeLancamento(userId, lancamento.id);
        await this.repository.update(userId, lancamento);
        return this.repository.select({id_user: userId, id: lancamento.id});
    }

    private lancamnetoCorreto (lancamento: any)
    {

    }

    private async existeLancamento (userId: string, lancamentoId: string)
    {
        const existeLancamento = this.repository.select({id_user: userId, id: lancamentoId});
        if (!existeLancamento) throw new Error("Lançamento não existe");
        return existeLancamento;
    }
}


type LancamentoModel = {
    id?: string,
    ativo: string, 
    quantidade: number, 
    preco: number,
    data: Date,
    compra: boolean
}