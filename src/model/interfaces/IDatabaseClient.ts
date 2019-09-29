
export default interface IDatabaseClient {


    openConnection(url?: string): Promise<any>;

    closeConnection(): Promise<boolean>;

    query(key: any): Promise<any>;
}
