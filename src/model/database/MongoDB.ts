import IDatabaseClient, {DatabaseConnectionError} from "../interfaces/IDatabaseClient";
import {MongoClient} from "mongodb";
import Log from "../../Util";

export default class MongoDB implements IDatabaseClient {

    public static readonly dbUrl: string = "mongodb://127.0.0.1:27017/PackageManager";
    private dbConnection: any;

    public async openConnection(url?: string): Promise<any> {
        try {
            this.dbConnection = await MongoClient.connect((url) ? url : MongoDB.dbUrl, { useNewUrlParser: true });
            return this.dbConnection;
        } catch (err) {
            Log.warn(`MongoDB::Connection error: ${err}`);
            throw new DatabaseConnectionError(`DBClient failed with error: ${err}`);
        }
    }

    public async closeConnection(): Promise<boolean> {
        if (this.dbConnection) {
            try {
                await this.dbConnection.close();
                return true;
            } catch (err) {
                throw new DatabaseConnectionError(`MongoDB::Failed to close connection with error: ${err}`);
            }
        }
    }
}