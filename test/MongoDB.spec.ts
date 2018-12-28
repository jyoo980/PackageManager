import Log from "../src/Util";
import {expect} from "chai";
import MongoDB from "../src/model/database/MongoDB";
import {DatabaseConnectionError} from "../src/model/interfaces/IDatabaseClient";
import Person from "../src/model/Person";
import IPackage from "../src/model/interfaces/IPackage";
import {Guid} from "guid-typescript";
import Package from "../src/model/Package";
import {CommandCursorResult} from "mongodb";

describe("DatabaseClient Tests", () => {

    let dbClient: MongoDB;
    let tstGuid: Guid;
    let tstDate: Date;
    let tstPkg: IPackage;
    let person: Person;

    before(() => {
        try {
            dbClient = new MongoDB();
            tstGuid = Guid.create();
            tstDate = new Date();
            person = new Person("Jack", "Smith", "j.smith@dev.com");
            tstPkg = new Package(person, tstGuid);
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
            expect(connectionResult.s.name).to.equal("PackageTable");
        }
    });

    it("Should be able to insert a newly received package into the DB", async () => {
        let insertResult: boolean;
        try {
            insertResult = await dbClient.update(person, tstPkg);
        } catch (err) {
            Log.warn(`DeliveryDelegateSpec::Failed to insert package into DB with error: ${err}`);
            insertResult = err;
        } finally {
            expect(insertResult).to.be.true;
        }
    });

    it("Should be able to query the DB for the newly received package", async () => {
        let searchResult: any;
        try {
            searchResult = await dbClient.query(tstPkg.getId());
        } catch (err) {
            searchResult = err;
        } finally {
            expect(searchResult).to.deep.equal({
                _id: tstPkg.getId().toString(),
                firstName: tstPkg.getFirstName(),
                lastName: tstPkg.getLastName(),
                arrivalDate: tstPkg.getArrivalDate(),
                pickupDate: tstPkg.getPickupDate()
            });
        }
    });

    it("Should be able to delete the record for the newly received package", async () => {
        let deleteResult: CommandCursorResult;
        try {
            deleteResult = await dbClient.deleteRecord(tstPkg.getId());
        } catch (err) {
            deleteResult = err;
        } finally {
            expect(deleteResult.deletedCount).to.equal(1);
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