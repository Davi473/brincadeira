import crypto from "crypto";
import Hash from "./Hash";
import UsuarioDAO from "../Repository";

export default class RegisterService
{
    constructor (
        private repository: UsuarioDAO
    ) {}

    async post (name: string, senha: string)
    {
        this.verificarValores(name, senha);
        await this.usuarioExiste(name);
        const usuario = {
            id: crypto.randomUUID(),
            name: name,
            hash: await Hash.createHash(senha),
            createDat: new Date()
        };
        await this.repository.insert(usuario)
        return await this.nameUser(name);
    }
    /*
    async delete(name: string, senha: string)
    {
        this.verificarValores(name, senha);
        const usuario = await this.repository.select(name);
        const passowordRigth = await Hash.authentic(senha, usuario[0].hash);
        if (!passowordRigth) throw new Error ("Senha incorreta");
        await this.repository.delete(name);
        return { message: "Usuario deletado" };
    }
    */
    public async get(name: string, senha: string)
    {
        this.verificarValores(name, senha);
        return await this.nameUser(name);
    }

    private async nameUser(name: string)
    {
        const user = await this.repository.select(name);
        return { id: user.id, name: user.name };
    }

    private async usuarioExiste(name: string)
    {
        const usuario = await this.repository.select(name);
        if (usuario) throw new Error("Usuario ja existe");
    }

    verificarValores(name: string, senha: string)
    {
        if (!name) throw new Error("Não coloco nome de usuario");
        if (!senha) throw new Error("Não coloco a senha");
    }
}