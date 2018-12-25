import {expect} from "chai";
import {Guid} from "guid-typescript";
import Person from "../src/model/Person";
import Log from "../src/Util";
import IPackage, {DuplicatePackageError} from "../src/model/interfaces/IPackage";
import {MockPackage} from "./mocks/MockPackage";
import IObserver from "../src/model/interfaces/IObserver";
import {MockObserver} from "./mocks/MockObserver";
import {DuplicateObserverError} from "../src/model/Subject";

describe("Person Tests", () => {

    let person: Person;
    const testPkg1: IPackage = new MockPackage(Guid.create(), new Date());
    const testPkg2: IPackage = new MockPackage(Guid.create(), new Date());
    const obs: IObserver = new MockObserver();
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

    it("Should add an observer to its list of observers", () => {
        let result: IObserver[] = [obs];
        expect(person.registerObserver(obs)).to.deep.equal(result);
    });

    it("Should not add an observer which has already been added", () => {
        let result: IObserver[];
        try {
            result = person.registerObserver(obs);
        } catch (err) {
            result = err;
        } finally {
            expect(result).to.be.instanceOf(DuplicateObserverError);
        }
    });

    it("Should be able to deregister an observer after adding it", () => {
        expect(person.deregisterObserver(obs)).to.deep.equal([]);
    });
});
