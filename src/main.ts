import express, { Express } from "express";
import cors from "cors";
import LancamentoModule from "./Lancamento/Module";
import AtivoModule from "./Ativo/Module";
import UsuarioModule from "./Usuario/Module";
import DBConnect, { PostgresConnection } from "./Config/DBConfig";
import "dotenv/config";

const PORT: number = 3000;

const api: Express = express();
api.use(express.json());
api.use(cors());

// @ts-ignore
const configPostgres: string =  process.env.CONFIG_POSTGRES
const postgresDB: DBConnect = new PostgresConnection(configPostgres);

const ativo: AtivoModule = new AtivoModule(api, postgresDB);
const lancamento: LancamentoModule = new LancamentoModule(api, postgresDB, ativo.isService());
const usuario: UsuarioModule = new UsuarioModule(api, postgresDB);

api.listen(PORT, () => 
{
    console.log(`Servidor aberto ${PORT}`)
});