import express, { Express, Request, Response } from "express";
import cors from "cors";
import Token from "../../Usuario/Login/Token";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export default interface ApiHttp
{
  registerAuth (method: HttpMethod, url: string, middleware: Function, callback: Function): Promise<void>
  register (method: HttpMethod, url: string, callback: Function, middleware?: Function): Promise<void>
  listen (port: string | number): Promise<void>
}

export class ApiHttpExpress implements ApiHttp
{
  private api: Express;

  constructor () 
  {
    this.api = express();
    this.api.use(express.json());
    this.api.use(cors());
  }

  async registerAuth(method: HttpMethod, url: string, middleware: Function, callback: Function)
  {
    this.api[method](url, middleware(), async (req: Request, res: Response) => callback(req, res)); 
  }

  async register(method: HttpMethod, url: string, callback: Function): Promise<void> 
  {
    this.api[method](url, async (req: Request, res: Response) => callback(req, res)); 
  }

  async listen(port: string | number): Promise<void> 
  {
    this.api.listen(port, () => {console.log(`Servidor aberto ${port}`)});
  }
  
}