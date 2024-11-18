import LancamentoModule from "./Lancamento/Module";
import AtivoModule from "./Ativo/Module";
import UsuarioModule from "./Usuario/Module";
import DBConnect, { PostgresConnection } from "./Config/DBConnect/DBConnect";
import "dotenv/config";
import ApiHttp, { ApiHttpExpress } from "./Config/ApiHttp/ApiHttp";

// @ts-ignore
const PORT: string = process.env.CONFIG_POSTGRES;
// @ts-ignore
const configPostgres: string =  process.env.CONFIG_POSTGRES;

const api: ApiHttp =  new ApiHttpExpress();

const postgresDB: DBConnect = new PostgresConnection(configPostgres);

const ativo: AtivoModule = new AtivoModule(api, postgresDB);
const lancamento: LancamentoModule = new LancamentoModule(api, postgresDB, ativo.isService());
const usuario: UsuarioModule = new UsuarioModule(api, postgresDB);

api.listen(PORT);