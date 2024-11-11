import { Express } from "express";
import RegisterService from "../Register/Service";
import LoginService from "./Service";
import LoginController from "./Login";


export default class LoginModule
{
    private service: LoginService;
    private controller: LoginController

    constructor (
        private api: Express,
        private serviceRegister: RegisterService
    ) {
        this.service = new LoginService(this.serviceRegister);
        this.controller = new LoginController(this.api, this.service);
    }
}