import express, { Express } from "express";
import cors from "cors";
import LancamentoModulo from "./Lancamento/Modulo";
import AtivoModulo from "./Ativo/Modulo";

const PORT: number = 3000;

const api: Express = express();
api.use(express.json());
api.use(cors());

const ativo: AtivoModulo = new AtivoModulo(api);
const lancamento: LancamentoModulo = new LancamentoModulo(api, ativo.isService());

api.listen(PORT, () => 
{
    console.log(`Servidor aberto ${PORT}`)
});