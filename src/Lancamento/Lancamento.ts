import express, { Express } from "express"; 
import LancamentoService from "./Service";

export default class LancamentoAPI
{
    public api: Express = express();

    constructor (private service: LancamentoService) 
    {
        this.api.use(express.json());
    }

    build ()
    {
        this.api.post("/lancamento", async (req: any, res: any) =>
        {
            const lancamento = req.body;
            try {
                const output = this.service.save(lancamento);
                res.json(output);
            }
        });
    }
}