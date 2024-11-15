import { Express } from "express";
import RegisterModule from "./Register/Module";
import UsuarioDAO, { UsuarioDAOMemoria } from "./Repository";
import LoginModule from "./Login/Module";
import DBConnect from "../Config/DBConfig";

export default class UsuarioModule
{   
    private registerModule: RegisterModule;
    private loginModule: LoginModule;
    private repository: UsuarioDAO

    constructor(
        private api: Express,
        private connection: DBConnect
    ) {
        this.repository = new UsuarioDAOMemoria();
        this.registerModule = new RegisterModule(this.api, this.repository);
        this.loginModule = new LoginModule(this.api, this.registerModule.isService());
    }
}