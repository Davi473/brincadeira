import RegisterModule from "./Register/Module";
import UsuarioDAO, { UsuarioDAODataBase } from "./Repository";
import LoginModule from "./Login/Module";
import DBConnect from "../Config/DBConnect/DBConnect";
import ApiHttp from "../Config/ApiHttp/ApiHttp";

export default class UsuarioModule
{   
    private registerModule: RegisterModule;
    //private loginModule: LoginModule;
    private repository: UsuarioDAO

    constructor(
        private api: ApiHttp,
        //private connection: DBConnect
    ) {
        this.repository = new UsuarioDAODataBase();
        this.registerModule = new RegisterModule(this.api, this.repository);
        //this.loginModule = new LoginModule(this.api, this.registerModule.isService());
    }
}