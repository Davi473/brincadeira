import pgPromise, { IDatabase, IMain } from "pg-promise";

export default interface DBConnect {
    connect(): Promise<void>;
    query (query: string, params?: any[]): Promise<any>;
    close (): Promise<void>;
}

type DBConfig = {
    host: string;
    user: string;
    password: string;
    database: string;
}


export class PostgresConnection implements DBConnect
{
    private pgConnection: IDatabase<{}>;
    private pgp: IMain = pgPromise();

    constructor (config: string)
    {
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