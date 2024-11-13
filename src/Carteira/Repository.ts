import pgp from "pg-promise";

export default interface CarteiraDAO {
    select(userId: string): Promise<any>;
    update(userId: string, carteira: CarteiraInsert): Promise<void>;
    insert(carteira: CarteiraInsert): Promise<void>;
}

// export class LancamentoDAODataBase implements LancamentoDAO {}

export class CarteiraDAOMemoria implements CarteiraDAO
{
    private carteiraMemory: CarteiraInsert[] = [];

    async select(userId: string): Promise<any>
    {
        return this.carteiraMemory.filter(_carteira => _carteira.id_user === userId);
    }

    async update(userId: string, carteira: CarteiraInsert): Promise<void> 
    {
        const index = this.carteiraMemory.findIndex((_carteira) => 
            (_carteira.id === carteira.id && _carteira.id_user === userId && _carteira.id_ativo === carteira.id_ativo));
        this.carteiraMemory[index].quantidade = carteira.quantidade;
        this.carteiraMemory[index].media = carteira.media;
    }

    async insert(lancamento: CarteiraInsert): Promise<void>
    {
        this.carteiraMemory.push(lancamento);
    }
}

export type CarteiraInsert = {
    id?: string,
    id_ativo: string
    id_user: string
    quantidade: number, 
    media: number,
}