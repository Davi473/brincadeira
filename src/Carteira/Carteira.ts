import { Express } from "express";
import CarteiraService from "./Service";
import Token from "../Usuario/Login/Token";

export default class LancamentoController
{
    constructor (
        private api: Express,
        private service: CarteiraService
    ) {
        this.api.post("/carteira", Token.authToke, async (req: any, res: any) =>
        {
            const {id} = req.user;
            const lancamento = req.body;
            try {
                const output = await this.service.post(id, lancamento);
                res.json(output);
            } catch (e: any) {
                res.status(422).json({ message: e.message});
            }
        });

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

        this.api.put("/carteira", Token.authToke, async (req: any, res: any) =>
        {
            const {id} = req.user;
            const lancamento = req.body;
            try {
                await this.service.put(id, lancamento);
                res.json({ message: "Atualizado com sucesso" });
            } catch (e: any) {
                res.status(422).json({ message: e.message });
            }
        });

        this.api.delete("/carteira", Token.authToke, async (req: any, res: any) => 
        {
            const {id} = req.user;
            const lancamento = req.body;
            try {
                await this.service.delete(id, lancamento);
                res.json({ message: "Deletado com sucesso" });
            } catch (e: any) { 
                res.status(422).json({ message: e.message });
            }
        });
    }
}