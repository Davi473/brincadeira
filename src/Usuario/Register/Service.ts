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
        const _usuario = {
            id: crypto.randomUUID(),
            name: name,
            hash: await Hash.createHash(senha),
            createAd: new Date()
        };
        await this.repository.insert(_usuario);
        return await this.repository.select(name);
    }

    async delete(name: string, senha: string)
    {
        this.verificarValores(name, senha);
        const usuario = await this.repository.select(name);
        const passowordRigth = await Hash.authentic(senha, usuario[0].hash);
        if (!passowordRigth) throw new Error ("Senha incorreta");
        await this.repository.delete(name);
        return { message: "Usuario deletado" };
    }

    public async get(name: string, senha: string)
    {
        this.verificarValores(name, senha);
        const [usuario] = await this.repository.select(name);
        return { id: usuario.id, name: usuario.name };
    }

    async usuarioExiste(name: string)
    {
        const usuario = await this.repository.select(name);
        if (usuario[0]) throw new Error("Usuario ja existe");
    }

    verificarValores(name: string, senha: string)
    {
        if (!name) throw new Error("Não coloco nome de usuario");
        if (!senha) throw new Error("Não coloco a senha");
    }
}