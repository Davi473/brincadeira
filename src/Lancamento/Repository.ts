import pgp from "pg-promise";
import Lancamento from "./ObjectLancamento";
import DBConnect from "../Config/DBConnect/DBConnect";
import { query } from "express";

export default interface LancamentoDAO {
    select(lancamento: { id_user: string, id?: string, id_ativo?: string }): Promise<any>;
    delete(userId: string, lancamentoId: string): Promise<void>;
    update(userId: string, lancamento: Lancamento): Promise<void>;
    insert(lancamento: Lancamento): Promise<void>;
}

export class LancamentoDAODataBase implements LancamentoDAO 
{
    private table: string = "lancamento"
    constructor (private dbConnect: DBConnect) {}

    public async select(lancamento: { id_user: string; id?: string; id_ativo?: string; }): Promise<any> 
    {
        const query = `SELECT * FROM ${this.table} WHERE id_usuario = ${lancamento.id_user} AND `;
        if (lancamento.id) return await this.dbConnect.query(query + "id = $1", [lancamento.id]);
        if (lancamento.id_ativo) return await this.dbConnect.query(query + "id_ativo = $1", [lancamento.id_ativo]);
        return await this.dbConnect.query(query);
    }

    public async delete(userId: string, lancamentoId: string): Promise<void> 
    {
        const query = `DELETE FROM ${this.table} WHERE id_usuario = $1 AND id = $2`;
        await this.dbConnect.query(query, [userId, lancamentoId]);

    }

    public async update(userId: string, lancamento: Lancamento): Promise<void> 
    {
        const query = `UPDATE ${this.table} SET quantidade = $1 
            AND preco = $2 AND data = $3 WHERE id_usuario = ${userId}`;
        await this.dbConnect.query(query, 
            [lancamento.getCompra(), lancamento.getPreco(), lancamento.getData()]);
    }

    public async insert(lancamento: Lancamento): Promise<void> 
    {
        const query = `INSERT INTO ${this.table} 
            (id, id_ativo, id_usuario, quantidade, preco, data, compra) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        await this.dbConnect.query(query, 
            [
                lancamento.getID(), lancamento.getIDAtivo(), lancamento.getIDUser(),
                lancamento.getQuantidade(), lancamento.getPreco(), lancamento.getData(),
                lancamento.getCompra()
            ])
    }
}
/*
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
*/
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