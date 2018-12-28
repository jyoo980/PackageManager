import DatabaseClient, {DatabaseConnectionError} from "../src/model/database/DatabaseClient";
import Log from "../src/Util";
import {expect} from "chai";

describe("DatabaseClient Tests", () => {

    let dbClient: DatabaseClient;

    before(() => {
        try {
            dbClient = new DatabaseClient();
        } catch (err) {
            Log.warn(`DatabaseClientSpec::Failed to instantiate dbClient with err: ${err}`);
        } finally {
            expect(dbClient).to.be.instanceOf(DatabaseClient);
        }
    });


    it("Should throw a DatabaseConnectionError when provided with an incorrect url", async () => {
        const fakeUrl: string = "mongodb://127.0.0.1:27017/FakeUrl";
        let connectionResult: any;
        try {
            connectionResult = await dbClient.openConnection(fakeUrl);
        } catch (err) {
            connectionResult = err;
        } finally {
            expect(connectionResult).to.be.instanceOf(DatabaseConnectionError);
        }
    });


});