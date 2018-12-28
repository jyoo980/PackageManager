import { MongoClient } from "mongodb";

export class DatabaseConnectionError extends Error {
    constructor(...args: any[]) {
        super(...args);
    }
}

export default class DatabaseClient {

    private readonly dbUrl: string = "mongodb://127.0.0.1:27017/PackageManager";
    private dbConnection: any;

    public async openConnection(url?: string): Promise<any> {
        return Promise.reject("Not Implemented");
    }
}