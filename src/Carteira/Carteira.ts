import { Express } from "express";
import CarteiraService from "./Service";
import Token from "../Usuario/Login/Token";

export default class CarteiraController
{
    constructor (
        private api: Express,
        private service: CarteiraService
    ) {
        this.api.get("/carteira", Token.authToke, async (req: any, res: any) =>
        {
            const {id} = req.user;
            try {
                const output = await this.service.get(id);
                res.json(output);
            } catch (e: any) {
                res.status(422).json({ message: e.message });
            }
        });
    }
}