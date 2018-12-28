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
    let pickupDate: Date;

    before(() => {
        try {
            dbClient = new MongoDB();
            tstGuid = Guid.create();
            tstDate = new Date();
            person = new Person("Jack", "Smith", "j.smith@dev.com");
            tstPkg = new Package(person, tstGuid);
            pickupDate = new Date();
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
            Log.warn(`MongoDB::Failed to insert package into DB with error: ${err}`);
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
                pickupDate: null
            });
        }
    });

    it("Should be able to update the newly received package in the DB", async () => {
        let updateResult: boolean;
        try {
            tstPkg.setPickupDate(pickupDate);
            updateResult = await dbClient.update(person, tstPkg);
        } catch (err) {
            Log.warn(`MongoDB::Failed to update package with error: ${err}`);
            updateResult = err;
        } finally {
            expect(updateResult).to.be.true;
        }
    });

    it("Should reflect the record with the latest updates in the DB", async () => {
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

    it("Should be able to query the DB for all records", async () => {
        const p1: IPackage = new Package(person);
        const p2: IPackage = new Package(person);
        const p3: IPackage = new Package(person);
        const pkgs: IPackage[] = [p1, p2, p3];
        try {
            for (const pkg of pkgs) {
                await dbClient.update(person, pkg);
            }
        } catch (err) {
            Log.warn(`MongoDB::Failed to insert package with error: ${err}`);
            expect.fail();
        }
        let retrievedResults: IPackage[];
        try {
            retrievedResults = await dbClient.retrieveAllRecords();
        } catch (err) {
            Log.warn(`MongoDB::Unable to fetch from database, error: ${err}`);
            retrievedResults = err;
        } finally {
            expect(retrievedResults).to.deep.equal(pkgs);
            pkgs.map((pkg) => dbClient.deleteRecord(pkg.getId()));
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