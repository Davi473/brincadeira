import { Express } from "express";
import LancamentoService from "./Service";

export default class LancamentoController
{
    constructor (
        private api: Express,
        private service: LancamentoService
    ) {
        this.api.post("/lancamento", async (req: any, res: any) =>
        {
            const userId = "sidnisdniwwer"; // req.user;
            const lancamento = req.body;
            try {
                const output = await this.service.post(userId, lancamento);
                res.json(output);
            } catch (e: any) {
                res.status(422).json({ message: e.message});
            }
        });

        this.api.get("/lancamento", async (req: any, res: any) =>
        {
            const userId =  "sidnisdniwwer"; //req.user;
            try {
                const output = await this.service.get(userId);
                res.json(output);
            } catch (e: any) {
                res.status(422).json({ message: e.message });
            }
        });

        this.api.put("/lancamento", async (req: any, res: any) =>
        {
            const userId = "sidnisdniwwer" //req.user;
            const lancamento = req.body;
            try {
                await this.service.put(userId, lancamento);
                res.json({ message: "Atualizado com sucesso" });
            } catch (e: any) {
                res.status(422).json({ message: e.message });
            }
        });

        this.api.delete("/lancamento", async (req: any, res: any) => 
        {
            const userId = "sidnisdniwwer" //req.user;
            const lancamento = req.body;
            try {
                await this.service.delete(userId, lancamento);
                res.json({ message: "Deletado com sucesso" });
            } catch (e: any) { 
                res.status(422).json({ message: e.message });
            }
        });
    }
}