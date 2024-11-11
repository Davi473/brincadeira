import crypto from "crypto";
import LancamentoDAO from "./Repository";
import LoginService from "../Ativo/Service";

export default class RegisterService
{
    constructor (
        private repository: LancamentoDAO,
        private serviceLogin: LoginService
    ) {}

    async post (user: UsuarioModel)
    {
        
    }

}


type UsuarioModel = {
    id?: string,
    name: string,
    hash: string,
    createAd: Date
}   