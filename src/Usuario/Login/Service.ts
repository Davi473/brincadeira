import RegisterService from "../Register/Service";
import Token from "./Token";

export default class LoginService
{
    constructor (
        private serviceRegister: RegisterService
    ) {}

    public async post (name: string, senha: string)
    {
        const usuario = await this.serviceRegister.get(name, senha);
        if (!usuario.id) throw new Error("Usuario não existe");
        const token = await Token.createToken(usuario.id, usuario.name);
        return token;
    }
}

