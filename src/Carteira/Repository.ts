import pgp from "pg-promise";

export default interface CarteiraDAO {
    select(ativo: CarteiraSelect): Promise<any>;
    update(carteira: CarteiraInsert): Promise<void>;
    insert(carteira: CarteiraInsert): Promise<void>;
}

// export class LancamentoDAODataBase implements LancamentoDAO {}

export class CarteiraDAOMemoria implements CarteiraDAO
{
    private carteiraMemory: CarteiraInsert[] = [];

    async select(ativo: CarteiraSelect): Promise<any>
    {
        if (ativo.id) return this.carteiraMemory.filter(_carteira => 
            (_carteira.id_user === ativo.id_user && _carteira.id === ativo.id));
        if (ativo.id_ativo) return this.carteiraMemory.filter(_carteira => 
            (_carteira.id_user === ativo.id_user && _carteira.id_ativo === ativo.id_ativo));
        return this.carteiraMemory.filter(_carteira => (_carteira.id_user === ativo.id_user));
    }

    async update(carteira: CarteiraInsert): Promise<void> 
    {
        const index = this.carteiraMemory.findIndex((_carteira) => 
            (_carteira.id_user === carteira.id_user && 
                _carteira.id_ativo === carteira.id_ativo));
        this.carteiraMemory[index].quantidade = carteira.quantidade;
        this.carteiraMemory[index].media = carteira.media;
    }

    async insert(lancamento: CarteiraInsert): Promise<void>
    {
        this.carteiraMemory.push(lancamento);
    }
}

export type CarteiraSelect = {
    id_user: string,
    id_ativo?: string,
    id?: string
}

export type CarteiraInsert = {
    id?: string,
    id_ativo: string
    id_user: string
    quantidade: number, 
    media: number,
}