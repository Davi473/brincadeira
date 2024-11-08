import { Express } from "express";
import AtivoService from "./Service";


export default class AtivoController
{
    constructor (
        private api: Express,
        private service: AtivoService
    ) {
        this.api.post("/ativo", async (req: any, res: any) =>
        {
            const ativo = req.body;
            try {
                const output = await this.service.post(ativo);
                res.json(output);
            } catch (e: any) {
                res.status(422).json({ message: e.message});
            }
        });

        this.api.get("/ativo", async (req: any, res: any) =>
        {
            try {
                const output = await this.service.get();
                res.json(output);
            } catch (e: any) {
                res.status(422).json({ message: e.message });
            }
        });

        this.api.delete("/ativo", async (req: any, res: any) => 
        {
          const ativoID = req.body;
          try {
              this.service.delete(ativoID);
              res.json({ message: "Deletado com sucesso" });
          } catch (e: any) { 
              res.status(422).json({ message: e.message });
          }
        });
    }
}