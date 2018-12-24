import {expect} from "chai";
import Package from "../src/model/Package";
import {Guid} from "guid-typescript";
import Person from "../src/model/Person";
import Log from "../src/Util";
import IPackage, {DuplicatePackageError} from "../src/model/interfaces/IPackage";

class MockPackage implements IPackage {

    private readonly id: Guid;
    private readonly testDate: Date;

    constructor(id: Guid, testDate: Date) {
        this.id = id;
        this.testDate = testDate;
    }

    public getArrivalDate(): Date {
        return this.testDate;
    }

    public getFirstName(): string {
        return "Mock";
    }

    public getId(): Guid {
        return this.id;
    }

    public getLastName(): string {
        return "Package";
    }

    public getPickupDate(): Date {
        return this.testDate;
    }

}

describe("Person Tests", () => {

    let person: Person;
    const testPkg1: IPackage = new MockPackage(Guid.create(), new Date());
    const testPkg2: IPackage = new MockPackage(Guid.create(), new Date());
    const firstName: string = "John";
    const lastName: string = "Smith";

    try {
        person = new Person(firstName, lastName);
    } catch (err) {
        Log.warn(err);
    } finally {
        expect(person).to.be.instanceOf(Person);
    }

    it("Should be able to get the first and last name", () => {
        const getFirst: string = person.getFirstName();
        const getLast: string = person.getLastName();
        expect(getFirst).to.equal(firstName);
        expect(getLast).to.equal(lastName);
    });

    it("Should be able to add a package", () => {
        let addResult: IPackage[];
        try {
            addResult = person.addPackage(testPkg1);
        } catch (err) {
            Log.warn("Should not have failed to add a package");
            addResult = err;
        } finally {
            expect(addResult).to.deep.equal([testPkg1]);
        }
    });

    it("Should not add duplicate packages", () => {
        let addResult: IPackage[];
        try {
            addResult = person.addPackage(testPkg1);
        } catch (err) {
            addResult = err;
        } finally {
            expect(addResult).to.be.instanceOf(DuplicatePackageError);
        }
    });

    it("Should add another valid package", () => {
        let addResult: IPackage[];
        try {
            addResult = person.addPackage(testPkg2);
        } catch (err) {
            Log.warn("Should not have failed to add a package");
            addResult = err;
        } finally {
            expect(addResult).to.deep.equal([testPkg1, testPkg2]);
        }
    });

    it("Should get a list of packages which have been added for a person", () => {
        const addedPackages: IPackage[] = [testPkg1, testPkg2];
        expect(person.getPackages()).to.deep.equal(addedPackages);
    });

});
