import pgp from "pg-promise";

export default interface UsuarioDAO {
    select(name: string): Promise<any>;
    delete(id: string, name: string): Promise<void>;
    insert(lancamento: UsuarioModel): Promise<void>;
}

// export class UsuarioDAODataBase implements UsuarioDAO {}

export class UsuarioDAOMemoria implements UsuarioDAO
{
    private usuarioMemory: UsuarioModel[] = [];

    async select(name: string): Promise<any>
    {
        if (lancamentoId) return this.usuarioMemory.filter(_lancamento => 
            (_lancamento.id === lancamentoId && _lancamento.id === userId));
        return this.usuarioMemory.filter(_lancamento => _lancamento.id === userId);
    }

    async delete(id: string, name: string): Promise<void> 
    {
        const index = this.usuarioMemory.findIndex((_lancamento) =>
            (_lancamento.id === lancamentoId && _lancamento.id == userId));
        this.usuarioMemory.splice(index, (index + 1));
    }

    async insert(lancamento: UsuarioModel): Promise<void>
    {
        this.usuarioMemory.push(lancamento);
    }
}

type UsuarioModel = {
  id?: string,
  name: string,
  hash: string,
  createAd: Date
}   