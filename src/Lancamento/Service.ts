import crypto from "crypto";
import LancamentoDAO from "./Repository";
import AtivoService from "../Ativo/Service";

export default class LancamentoService
{
    constructor (
        private repository: LancamentoDAO,
        private serviceAtivo: AtivoService
        /*
        private serviceCarteira: CarteiraService
        */
    ) {}

    async post (userId: string, lancamento: any)
    {
        if (lancamento.quantidade < 0) throw new Error("Lançamento não possui quantidade");
        if (lancamento.preco < 0) throw new Error("Lançamento não posssui valor");
        if (!lancamento.data) throw new Error("Não tem data");
        if (lancamento.compra !== true && lancamento.compra !== false) throw new Error("Não possui ordem de compra ou venda");
        const [id_ativo] = await this.serviceAtivo.get(lancamento);
        if (id_ativo === undefined) throw new Error("ativo não encontrado");
        const _lancamento = {
            id: crypto.randomUUID(),
            id_ativo: id_ativo.id,
            id_user: userId,
            quantidade: lancamento.quantidade,
            preco: lancamento.preco,
            data: lancamento.data,
            compra: lancamento.compra
        };
        await this.repository.insert(_lancamento);
        return {lancamento: _lancamento.id};
    }

    async get (userId: string)
    {
        return await this.repository.select(userId);
    }

    async getID (userId: string, lancamentoId: string)
    {
        return this.existeLancamento(userId, lancamentoId);
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
        return this.repository.select(userId, lancamento.id);
    }

    private async existeLancamento (userId: string, lancamentoId: string)
    {
        const existeLancamento = this.repository.select(userId, lancamentoId);
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