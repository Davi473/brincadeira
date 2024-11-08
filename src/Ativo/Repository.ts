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
    private ativoMemory: AtivoInsert[] = [
        {
            "id": "9f20dbc6-be41-44d7-a20e-1dee44eda854",
            "ticket": "VALE3",
            "tipo": "Acões"
        }
    ];

    async select (ativo: { id?: string, tipo?: string, ticket?: string }): Promise<any> 
    {
        if(!ativo) return this.ativoMemory;
        if (ativo.id !== undefined) return await this.ativoMemory.filter(_ativo => _ativo.id === ativo.id);
        if (ativo.tipo !== undefined) return await this.ativoMemory.filter(_ativo => _ativo.tipo === ativo.tipo);
        if (ativo.ticket !== undefined) return await this.ativoMemory.filter(_ativo => _ativo.ticket === ativo.ticket);
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