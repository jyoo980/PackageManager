import Log from "../src/Util";
import {expect} from "chai";
import MongoDB from "../src/model/database/MongoDB";
import {DatabaseConnectionError} from "../src/model/interfaces/IDatabaseClient";

describe("DatabaseClient Tests", () => {

    let dbClient: MongoDB;

    before(() => {
        try {
            dbClient = new MongoDB();
        } catch (err) {
            Log.warn(`DatabaseClientSpec::Failed to instantiate dbClient with err: ${err}`);
        } finally {
            expect(dbClient).to.be.instanceOf(MongoDB);
        }
    });


    it("Should throw a DatabaseConnectionError when provided with an incorrect url", async () => {
        const fakeUrl: string = "mongodb://127.0.0.1:270/fakeurl";
        let connectionResult: any;
        try {
            connectionResult = await dbClient.openConnection(fakeUrl);
        } catch (err) {
            connectionResult = err;
        } finally {
            expect(connectionResult).to.be.instanceOf(DatabaseConnectionError);
        }
    });

    it("Should be able to successfully connect to the PackageManager DB", async () => {
        let connectionResult: any;
        try {
            connectionResult = await dbClient.openConnection();
        } catch (err) {
            Log.warn(`MongoDB::Should not have failed to open a connection, error: ${err}`);
            connectionResult = err;
        } finally {
            expect(connectionResult.s.url).to.equal(MongoDB.dbUrl);
        }
    });

    it("Should be able to successfully close a MongoDB connection", async () => {
        let closeResult: boolean;
        try {
            closeResult = await dbClient.closeConnection();
        } catch (err) {
            Log.warn(`MongoDB::Should not have failed to close a connection, error: ${err}`);
            closeResult = err;
        } finally {
            expect(closeResult).to.be.true;
        }
    });

});