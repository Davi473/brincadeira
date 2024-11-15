import pgPromise, { IDatabase, IMain } from "pg-promise";

export default abstract class DBConnect {
    constructor (private config: string | DBConfig) {}
    abstract connect(): Promise<void>;
    abstract query (query: string, params?: any[]): Promise<any>;
    abstract close (): Promise<void>;
}

type DBConfig = {
    host: string;
    user: string;
    password: string;
    database: string;
}


export class PostgresConnection extends DBConnect
{
    private pgConnection: IDatabase<{}>;
    private pgp: IMain = pgPromise();

    constructor (config: string)
    {
        super(config);
        this.pgConnection = this.pgp(config);
    }

    async connect(): Promise<void> {}

    async query(query: string, params?: any[]): Promise<any> 
    {
        return this.pgConnection.query(query, params);
    }
    async close(): Promise<void> 
    {
        this.pgp.end();
    }
}