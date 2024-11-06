import pgp from "pg-promise";

export default interface LancamentoDAO {
    select(userId: string, lancamentoId?: string): Promise<any>;
    delete(userId: string, lancamentoId: string): Promise<void>;
    update(userId: string, lancamento: LancamentoUpdate): Promise<void>;
    insert(lancamento: LancamentoInsert): Promise<void>;
}

export class LancamentoDAODataBase implements LancamentoDAO
{
    select(userId: string, lancamentoId?: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(userId: string, lancamentoId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(userId: string, lancamento: LancamentoUpdate): Promise<void> {
        throw new Error("Method not implemented.");
    }
    insert(lancamento: LancamentoInsert): Promise<void> {
        throw new Error("Method not implemented.");
    }   
}

export class LancamentoDAOMemoria implements LancamentoDAO
{
    private lancamentoMemory: LancamentoInsert[] = [];

    async select(userId: string, lancamentoId?: string): Promise<any>
    {
        return this.lancamentoMemory.filter(lancamentos => lancamentos.id_user === userId);
    }
    delete(userId: string, lancamentoId: string): Promise<void> 
    {
        throw new Error("Method not implemented.");
    }
    update(userId: string, lancamento: LancamentoUpdate): Promise<void> 
    {
        throw new Error("Method not implemented.");
    }
    async insert(lancamento: LancamentoInsert): Promise<void>
    {
        this.lancamentoMemory.push(lancamento);
    }
}

type LancamentoUpdate = {
    id: string,
    quantidade: number, 
    preco: number,
    data: Date,
    compra: boolean
}

export type LancamentoInsert = {
    id_ativo: string
    id_user: string
    quantidade: number, 
    preco: number,
    data: Date,
    compra: boolean
}