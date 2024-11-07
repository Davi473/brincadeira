import pgp from "pg-promise";

export default interface AtivoDAO {
    select(ativo: { id?: string, tipo?: string, ticket?: string }): Promise<any>;
    delete(ativoID: string): Promise<void>;
    update(ativo: AtivoInsert): Promise<void>;
    insert(ativo: AtivoInsert): Promise<void>;
}

//export class AtivoDAODataBase implements AtivoDAO {}

export class AtivoDAOMemoria implements AtivoDAO
{
    private ativoMemory: AtivoInsert[] = [];

    async select (ativo: { id?: string, tipo?: string, ticket?: string }): Promise<any> 
    {
        let output;
        if (ativo.id) return await this.ativoMemory.filter(_ativo => _ativo.id === ativo.id);
        if (ativo.tipo) return await this.ativoMemory.filter(_ativo => _ativo.tipo === ativo.tipo);
        if (ativo.ticket) return await this.ativoMemory.filter(_ativo => _ativo.ticket === ativo.ticket);
        return this.ativoMemory; 
    }

    async delete(ativoID: string): Promise<void> 
    {
        const index: number = this.ativoMemory.findIndex((ativo) => ativo.id === ativoID);
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