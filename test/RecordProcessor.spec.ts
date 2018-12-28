import IPackage from "../src/model/interfaces/IPackage";
import Package from "../src/model/Package";
import Person from "../src/model/Person";
import {Guid} from "guid-typescript";
import RecordProcessor from "../src/model/database/RecordProcessor";
import {expect} from "chai";

describe("RecordProcessor Tests", () => {

    let sampleGuid: Guid;
    let testDate: Date;
    let sampleRecord: any;

    before(() => {
        sampleGuid = Guid.create();
        testDate = new Date();
        sampleRecord = {
            _id: sampleGuid.toString(),
            firstName: "John",
            lastName: "Smith",
            arrivalDate: testDate,
            pickupDate: null
        }
    });

    it("Should be able to generate an insert doc for MongoDB", () => {
        const pkg: IPackage = new Package(new Person("Test", "Person"), sampleGuid, testDate);
        expect(RecordProcessor.generateInsertDocument(pkg)).to.deep.equal({
            _id: sampleGuid.toString(),
            firstName: "Test",
            lastName: "Person",
            arrivalDate: testDate,
            pickupDate: null,
        });
    });

    it("Should be able to generate an update doc for MongoDB" , () => {
        const pkg: IPackage = new Package(new Person("Test", "Person"), sampleGuid, testDate);
        const testPickupDate: Date = new Date();
        pkg.setPickupDate(testPickupDate);
        expect(RecordProcessor.generateUpdateDocument(pkg)).to.deep.equal({
            $set: {
                pickupDate: testPickupDate
            }
        });
    });

    it("Should be able to parse object of type IPackage from a MongoDB record", () => {
        const recipient: Person = new Person("John", "Smith");
        let getPackage: (record: any) => IPackage;
        getPackage = RecordProcessor["getPackage"].bind(RecordProcessor);
        expect(getPackage(sampleRecord)).to.deep.equal(new Package(recipient, sampleGuid, testDate, null));
    });
});