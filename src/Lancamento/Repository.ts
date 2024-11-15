import pgp from "pg-promise";
import Lancamento from "./ObjectLancamento";

export default interface LancamentoDAO {
    select(lancamento: { id_user: string, id?: string, id_ativo?: string }): Promise<any>;
    delete(userId: string, lancamentoId: string): Promise<void>;
    update(userId: string, lancamento: LancamentoUpdate): Promise<void>;
    insert(lancamento: Lancamento): Promise<void>;
}

// export class LancamentoDAODataBase implements LancamentoDAO {}

export class LancamentoDAOMemoria implements LancamentoDAO
{
    private lancamentoMemory: Lancamento[] = [];

    async select(lancamento: { id_user: string, id?: string, id_ativo?: string }): Promise<any>
    {
        if (lancamento.id) return this.lancamentoMemory.filter(_lancamento => 
            (_lancamento.getID() === lancamento.id && _lancamento.getIDUser() === lancamento.id_user));
        if (lancamento.id_ativo) return this.lancamentoMemory.filter(_lancamento => 
            (_lancamento.getIDUser() === lancamento.id_user && _lancamento.getIDAtivo() === lancamento.id_ativo));
        return this.lancamentoMemory.filter(_lancamento => _lancamento.getIDUser() === lancamento.id_user);
    }

    async delete(userId: string, lancamentoId: string): Promise<void> 
    {
        const index = this.lancamentoMemory.findIndex((_lancamento) =>
            (_lancamento.getID() === lancamentoId && _lancamento.getIDUser() == userId));
        this.lancamentoMemory.splice(index, (index + 1));
    }

    async update(userId: string, lancamento: LancamentoUpdate): Promise<void> 
    {
        const index = this.lancamentoMemory.findIndex((_lancamento) => 
            (_lancamento.getID() === lancamento.id && _lancamento.getIDUser() === userId));
        this.lancamentoMemory[index].setQuantidade(lancamento.quantidade);
        this.lancamentoMemory[index].setPreco(lancamento.preco);
        this.lancamentoMemory[index].setData(lancamento.data);
        this.lancamentoMemory[index].setCompra(lancamento.compra);
    }

    async insert(lancamento: Lancamento): Promise<void>
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