import pgp from "pg-promise";

export default interface LancamentoDAO {
    select(userId: string, lancamentoId?: string): Promise<any>;
    delete(userId: string, lancamentoId: string): Promise<void>;
    update(userId: string, lancamento: LancamentoUpdate): Promise<void>;
    insert(lancamento: LancamentoInsert): Promise<void>;
}

// export class LancamentoDAODataBase implements LancamentoDAO {}

export class LancamentoDAOMemoria implements LancamentoDAO
{
    private lancamentoMemory: LancamentoInsert[] = [];

    async select(userId: string, lancamentoId?: string): Promise<any>
    {
        if (lancamentoId) return this.lancamentoMemory.filter(_lancamento => 
            (_lancamento.id === lancamentoId && _lancamento.id_user === userId));
        return this.lancamentoMemory.filter(_lancamento => _lancamento.id_user === userId);
    }

    async delete(userId: string, lancamentoId: string): Promise<void> 
    {
        const index = this.lancamentoMemory.findIndex((_lancamento) =>
            (_lancamento.id === lancamentoId && _lancamento.id_user == userId));
        this.lancamentoMemory.slice(index, index + 1);
    }

    async update(userId: string, lancamento: LancamentoUpdate): Promise<void> 
    {
        const index = this.lancamentoMemory.findIndex((_lancamento) => 
            (_lancamento.id === lancamento.id && _lancamento.id_user === userId));
        this.lancamentoMemory[index].quantidade = lancamento.quantidade;
        this.lancamentoMemory[index].preco = lancamento.preco;
        this.lancamentoMemory[index].data = lancamento.data;
        this.lancamentoMemory[index].compra = lancamento.compra;
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
    id?: string,
    id_ativo: string
    id_user: string
    quantidade: number, 
    preco: number,
    data: Date,
    compra: boolean
}