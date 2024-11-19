import UsuarioDAO from "../Repository";
import { Express } from "express";
import RegisterService from "./Service";
import RegisterController from "./Register";
import ApiHttp from "../../Config/ApiHttp/ApiHttp";


export default class RegisterModule
{
    private service: RegisterService;
    private controller: RegisterController

    constructor (
        private api: ApiHttp,
        private repository: UsuarioDAO
    ) {
        this.service = new RegisterService(this.repository);
        this.controller = new RegisterController(this.api, this.service);
    }

    public isService()
    {
        return this.service;
    }
}