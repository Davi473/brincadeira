import pgp from "pg-promise";

export default interface UsuarioDAO {
    select(name: string): Promise<any>;
    delete(name: string): Promise<void>;
    insert(user: any): Promise<void>;
}

export class UsuarioDAODataBase implements UsuarioDAO 
{
    async select(name: string): Promise<any> 
    {
        const connection = pgp()("postgres://postgres:1234@localhost:5432/investment");
		const [user] = await connection.query("select * from usuarios where name = $1", [name]);
		await connection.$pool.end();
		return user;
    }

    delete(name: string): Promise<void> 
    {
        throw new Error("Method not implemented.");
    }

    async insert(user: any): Promise<void> 
    {
        const connection = pgp()("postgres://postgres:1234@localhost:5432/investment");
		await connection.query(`insert into usuarios (id, name, hash, createdat) 
            values ($1, $2, $3, $4)`, 
            [user.id, user.name, user.hash, user.createDat]);
		await connection.$pool.end();
    }
}
/*
export class UsuarioDAOMemoria implements UsuarioDAO
{
    private usuarioMemory: UsuarioModel[] = [
        {
            id: '15639932-6277-42b5-88f6-c02767fdc09f',
            name: 'Davi',
            hash: '28663f436d8a8cb868d06cefe8d69b0f:b1fe5b2c83dcc6fbed1aa98ac6f20c81a69254956e223b43890ad96ad61cabeb4eae1ef7a8e49e73ad8b90c95408d2ed3cff051d30a57d42c24c8ed0e809bee4',
            createAd: new Date("2024-11-11T14:52:46.814Z")
        }
    ];

    async select(name: string): Promise<any>
    {
        return this.usuarioMemory.filter(_usuario => _usuario.name === name);
    }

    async delete(name: string): Promise<void> 
    {
        const index = this.usuarioMemory.findIndex((_usuario) => (_usuario.name == name));
        this.usuarioMemory.splice(index, (index + 1));
    }

    async insert(lancamento: UsuarioModel): Promise<void>
    {
        this.usuarioMemory.push(lancamento);
    }
}
*/