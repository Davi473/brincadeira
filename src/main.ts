import express, { Express } from "express";
import LancamentoModulo from "./Lancamento/Modulo";

const api: Express = express();
api.use(express.json());


const lancamento = new LancamentoModulo(api);