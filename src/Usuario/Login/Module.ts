import RegisterService from "../Register/Service";
import LoginService from "./Service";
import LoginController from "./Login";
import ApiHttp from "../../Config/ApiHttp/ApiHttp";


export default class LoginModule
{
    private service: LoginService;
    private controller: LoginController

    constructor (
        private api: ApiHttp,
        private serviceRegister: RegisterService
    ) {
        this.service = new LoginService(this.serviceRegister);
        this.controller = new LoginController(this.api, this.service);
    }
}