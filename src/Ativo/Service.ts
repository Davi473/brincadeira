import crypto from "crypto";
import AtivoDAO from "./Repository";

export default class AtivoService
{
    constructor (
        private repository: AtivoDAO,
    ) {}

    async post (ativo: any)
    {
        if (!ativo.tipo) throw new Error("Ativo não tem tipo");
        if (!ativo.ticket) throw new Error("Ativo não tem ticket");
        const id_ativo = await this.repository.select({ticket: ativo.ticket});
        if (!id_ativo) throw new Error("ativo não encontrado");
        const _ativo = {
            id: crypto.randomUUID(),
            ticket: ativo.ticket,
            tipo: ativo.tipo
        };
        await this.repository.insert(_ativo);
        return _ativo.id;
    }

    async get (ativo?: any)
    {
        if(ativo) return await this.repository.select(ativo);
        return await this.repository.select(ativo);
    }

    async delete (ativo: any)
    {
        const existAtivo = this.repository.select({id: ativo.id});
        if (!existAtivo) throw new Error("Não existe");
        await this.repository.delete(ativo);
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