import pgp from "pg-promise";

export default interface LancamentoDAO {
    select(ativo: { id?: string, tipo?: string, ticket?: string }): Promise<any>;
    delete(ativo: AtivoInsert): Promise<void>;
    update(ativo: AtivoInsert): Promise<void>;
    insert(ativo: AtivoInsert): Promise<void>;
}

//export class LancamentoDAODataBase implements LancamentoDAO {}

export class AtivoDAOMemoria implements LancamentoDAO
{
    private ativoMemory: AtivoInsert[] = [];

    async select (ativo: { id?: string, tipo?: string, ticket?: string }): Promise<any> 
    {
        let output;
        if (ativo.id) return output = await this.ativoMemory.filter(_ativo => _ativo.id === ativo.id);
        if (ativo.tipo) return output = await this.ativoMemory.filter(_ativo => _ativo.tipo === ativo.tipo);
        if (ativo.ticket) return output = await this.ativoMemory.filter(_ativo => _ativo.ticket === ativo.ticket);
        return output = this.ativoMemory; 
    }

    async delete(ativo: AtivoInsert): Promise<void> 
    {
        const index: number = this.ativoMemory.findIndex((_ativo) => _ativo.id === ativo.id);
        this.ativoMemory.slice(index, index + 1);
    }

    async update(ativo: AtivoInsert): Promise<void> 
    {
        const index = this.ativoMemory.findIndex((_ativo) => _ativo.id === ativo.id);
        this.ativoMemory[index].ticket = ativo.ticket;
        this.ativoMemory[index].tipo = ativo.tipo;
    }

    async insert(ativo: AtivoInsert): Promise<void> 
    {
        this.ativoMemory.push(ativo);
        return;
    }
}

export type AtivoInsert = {
    id: string,
    tipo: string,
    ticket: string
}