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
        const id_ativo = await this.repository.select({ ticket: ativo.ticket });
        if (id_ativo[0] !== undefined) throw new Error("Ativo ja existe");
        const _ativo = {
            id: crypto.randomUUID(),
            ticket: ativo.ticket,
            tipo: ativo.tipo
        };
        await this.repository.insert(_ativo);
        return {ativo: _ativo.id};
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