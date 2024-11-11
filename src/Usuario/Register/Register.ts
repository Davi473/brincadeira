import { Express } from "express";
import RegisterService from "./Service";

export default class LancamentoController
{
    constructor (
        private api: Express,
        private service: RegisterService
    ) {
        this.api.post("/register", async (req: any, res: any) =>
        {
            const user = req.body;
            try {
                const output = await this.service.post(user);
                res.json(output);
            } catch (e: any) {
                res.status(422).json({ message: e.message});
            }
        });
    }
}