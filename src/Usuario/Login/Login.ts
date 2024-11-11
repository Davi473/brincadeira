import { Express } from "express";
import LoginService from "./Service";

export default class LoginController
{
    constructor (
        private api: Express,
        private service: LoginService
    ) {
        this.api.post("/login", async (req: any, res: any) =>
        {
            const { name, passoword } = req.body;
            try {
                const output = await this.service.post(name, passoword);
                res.json(output);
            } catch (e: any) {
                res.status(422).json({ message: e.message});
            }
        });
    }
}