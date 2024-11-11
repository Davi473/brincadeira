import express, { Express } from "express";
import cors from "cors";
import LancamentoModule from "./Lancamento/Module";
import AtivoModule from "./Ativo/Module";
import UsuarioModule from "./Usuario/Module";

const PORT: number = 3000;

const api: Express = express();
api.use(express.json());
api.use(cors());

const ativo: AtivoModule = new AtivoModule(api);
const lancamento: LancamentoModule = new LancamentoModule(api, ativo.isService());
const usuario: UsuarioModule = new UsuarioModule(api);

api.listen(PORT, () => 
{
    console.log(`Servidor aberto ${PORT}`)
});