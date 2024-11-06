import crypto from "crypto";
import LancamentoDAO from "./Repository";

export default class LancamentoService
{
    constructor (
        private repository: LancamentoDAO,
        private serviceAtivo: AtivoService,
        private serviceUser: UserService,
        private serviceCarteira: CarteiraService

    ) {}

    async post (userId: string, lancamento: any)
    {
        if (lancamento.quantidade < 0) throw new Error("Lançamento não possui quantidade");
        if (lancamento.preco > 0) throw new Error("Lançamento não posssui valor");
        if (!lancamento.date) throw new Error("Não tem data");
        if (lancamento.compra !== true && lancamento.compra !== false) throw new Error("Não possui ordem de compra ou venda");
        const id_ativo = await this.serviceAtivo.getTicket(lancamento.ticket);
        if (!id_ativo) throw new Error("ativo não encontrado");
        const _lancamento = {
            id: crypto.randomUUID(),
            id_ativo,
            id_user: userId,
            quantidade: lancamento.quantidade,
            preco: lancamento.preco,
            data: lancamento.date,
            compra: lancamento.compra
        };
        await this.repository.insert(_lancamento);
        return _lancamento.id;
    }

    async get (userId: string)
    {
        const lancamentos = await this.repository.select(userId);
        return { lancamentos };
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
        return;
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