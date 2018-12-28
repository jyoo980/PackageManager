import IDatabaseClient, {
    DatabaseConnectionError,
    DatabaseQueryError,
    DatabaseWriteError
} from "../interfaces/IDatabaseClient";
import {CommandCursorResult, MongoClient, ObjectId} from "mongodb";
import Log from "../../Util";
import IObserver from "../interfaces/IObserver";
import IPackage from "../interfaces/IPackage";
import Person from "../Person";
import {Guid} from "guid-typescript";
import Package from "../Package";
import RecordProcessor from "./RecordProcessor";

export default class MongoDB implements IDatabaseClient, IObserver {

    public static readonly tableName: string = "PackageTable";
    private readonly dbUrl: string = "mongodb://127.0.0.1:27017/PackageManager";
    private collection: any;
    private dbConnection: any;

    public async openConnection(url?: string): Promise<any> {
        try {
            this.dbConnection = await MongoClient.connect((url) ? url : this.dbUrl, { useNewUrlParser: true });
            const db = this.dbConnection.db("Packages");
            this.collection = db.collection(MongoDB.tableName);
            return this.collection;
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

    public async update(subject: Person, pkg: IPackage): Promise<boolean> {
        try {
            if (pkg.isPickedUp()) {
                await this.updateRecord(pkg);
                return true;
            } else {
                await this.insertRecord(pkg);
                 return true;
            }
        } catch (err) {
            Log.warn(`MongoDB::Database write error likely, error: ${err}`);
            throw new DatabaseWriteError(`MongoDB::Database write error likely, error: ${err}`);
        }
    }

    public async query(id: Guid): Promise<any> {
        try {
            return await this.collection.findOne({ _id: id.toString() });
        } catch (err) {
            Log.warn(`MongoDB::Query error: ${err}`);
            throw new DatabaseQueryError(`Query failed with error: ${id}`);
        }
    }

    public async deleteRecord(id: Guid): Promise<CommandCursorResult> {
        try {
            return await this.collection.deleteOne({ _id: id.toString() });
        } catch (err) {
            Log.warn(`MongoDB::Delete error: ${err}`);
            throw new DatabaseQueryError(`Query failed with error: ${id}`);
        }
    }

    public async retrieveAllRecords(): Promise<IPackage[]> {
        let rawResult: any;
        try {
            rawResult = await this.collection.find({}).toArray();
            return RecordProcessor.processRecords(rawResult);
        } catch (err) {
            Log.warn(`MongoDB::Failed to retrieve records, error: ${err}`);
            throw new DatabaseQueryError(`MongoDB::Failed to retrieve records, error: ${err}`);
        }
    }

    private async insertRecord(pkg: IPackage): Promise<Guid> {
        const recordDocument = RecordProcessor.generateInsertDocument(pkg);
        try {
            await this.collection.insertOne(recordDocument);
            return pkg.getId();
        } catch (err) {
            Log.warn(`MongoDB::Database write error likely`);
            throw err;
        }
    }

    private async updateRecord(pkg: IPackage): Promise<Guid> {
        const primaryKey: string = pkg.getId().toString();
        const updateDocument = RecordProcessor.generateUpdateDocument(pkg);
        try {
            await this.collection.updateOne({ _id: primaryKey }, updateDocument);
            return pkg.getId();
        } catch (err) {
            Log.warn(`MongoDB::Database write error likely`);
            throw err;
        }
    }

}