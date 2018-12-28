import FileSystem from "../src/model/FileSystem";
import DeliveryDelegate, {UnrecognizedPersonError} from "../src/model/DeliveryDelegate";
import Log from "../src/Util";
import {expect} from "chai";
import Person from "../src/model/Person";
import Package from "../src/model/Package";
import IPackage from "../src/model/interfaces/IPackage";

describe("DeliveryDelegate Test", () => {

    let fileSystem: FileSystem;
    let deliveries: DeliveryDelegate;
    const rootDir: string = "./data";

    before(() => {
        try {
            fileSystem = new FileSystem(rootDir);
            deliveries = new DeliveryDelegate(fileSystem);
        } catch (err) {
            Log.warn("DeliveryDelegateSpec:: Failed to instantiate test objects");
        } finally {
            expect(fileSystem).to.be.instanceOf(FileSystem);
            expect(deliveries).to.be.instanceOf(DeliveryDelegate);
        }
    });

    after(async () => {
        const deliveryFile: string = deliveries.getRecordFileName();
        try {
            await FileSystem.deleteFile(deliveryFile, rootDir);
        } catch (err) {
            Log.warn("DeliveryDelegateSpec::test teardown failed");
            expect.fail();
        }
    });

    it("Should add a delivery to a person (single person in a list)", async () => {
        let p1: Person = new Person("John", "Smith", "jsmith@dev.com");
        const packageToAdd: IPackage = new Package(p1);
        let people: Person[] = [p1];
        let result: IPackage[];
        try {
            result = await deliveries.addDelivery(people, packageToAdd);
        } catch (err) {
            Log.warn(`DeliveryDelegateSpec::Failed to add package with error: ${err}`);
            result = err;
        } finally {
            expect(result).to.deep.equal([packageToAdd])
        }
    });

    it("Should add a delivery to a person (> 1 person in a list)", async () => {
        let p1: Person = new Person("John", "Smith", "jsmith@dev.com");
        let p2: Person = new Person("Jack", "Ryan", "jryan@dev.com");
        const packageToAdd: IPackage = new Package(p2);
        let people: Person[] = [p1, p2];
        let result: IPackage[];
        try {
            result = await deliveries.addDelivery(people, packageToAdd);
        } catch (err) {
            Log.warn(`DeliveryDelegateSpec::Failed to add package with error: ${err}`);
            result = err;
        } finally {
            expect(result).to.deep.equal([packageToAdd])
        }
    });

    it("Should successfully write a list of Person to disk", async () => {
        let people: Person[] = [];
        let writeResult: any;
        let p1: Person = new Person("John", "Smith", "jsmith@dev.com");
        let p2: Person = new Person("Paul", "Kerry", "pkerry@dev.com");
        p1.addPackage(new Package(p1));
        p1.addPackage(new Package(p1));
        people.push(p1);
        people.push(p2);
        try {
            writeResult = await deliveries.writeDeliveryData(people);
        } catch (err) {
            Log.warn(`DeliveryDelegateSpec::failed to write data with error: ${err}`);
            writeResult = err;
        } finally {
            expect(writeResult).to.equal(JSON.stringify(people));
        }
    });

    it("Should throw an UnrecognizedPersonError when trying to deliver a package to an unknown person", () => {
        let getMatchedPerson: (people: Person[], pkg: IPackage) => Person;
        getMatchedPerson = deliveries["getMatchedPerson"].bind(deliveries);
        let p1: Person = new Person("John", "Smith", "jsmith@dev.com");
        let pkg: IPackage = new Package(new Person("Not", "AValidPerson", "some.email@dev.com"));
        let people: Person[] = [p1];
        let resultPerson: Person;
        try {
            resultPerson = getMatchedPerson(people, pkg);
        } catch (err) {
            resultPerson = err;
        } finally {
            expect(resultPerson).to.be.instanceOf(UnrecognizedPersonError);
        }
    });

    it("Should match the correct person given a list and a package", () => {
        let getMatchedPerson: (people: Person[], pkg: IPackage) => Person;
        getMatchedPerson = deliveries["getMatchedPerson"].bind(deliveries);
        let p1: Person = new Person("John", "Smith", "jsmith@dev.com");
        let pkg: IPackage = new Package(p1);
        let people: Person[] = [p1];
        let resultPerson: Person;
        try {
            resultPerson = getMatchedPerson(people, pkg);
        } catch (err) {
            Log.warn(`DeliveryDelegateSpec::Failed with error: ${err}`);
            resultPerson = err;
        } finally {
            expect(resultPerson).to.deep.equal(p1);
        }
    });

});