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
        let lancamentos = this.lancamentoMemory.filter(_lancamento => _lancamento.id_user === userId);
        if (lancamentoId) lancamentos = lancamentos.filter(_lancamento => _lancamento.id === lancamentoId);
        return lancamentos;  
    }

    async delete(userId: string, lancamentoId: string): Promise<void> 
    {
        const index = this.lancamentoMemory.findIndex((lancamento) => lancamento.id === lancamentoId);
        this.lancamentoMemory.slice(index, index + 1);
    }

    async update(userId: string, lancamento: LancamentoUpdate): Promise<void> 
    {
        const index = this.lancamentoMemory.findIndex((lancamento) => lancamento.id === lancamento.id);
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