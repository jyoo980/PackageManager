import FileSystem from "../src/model/FileSystem";
import DeliveryDelegate from "../src/model/DeliveryDelegate";
import Log from "../src/Util";
import {expect} from "chai";
import Person from "../src/model/Person";
import Package from "../src/model/Package";

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

});