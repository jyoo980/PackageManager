import Log from "../src/Util";
import {expect} from "chai";
import PersonManager from "../src/model/PersonManager";
import Person from "../src/model/Person";
import {Guid} from "guid-typescript";

describe("PersonManager Tests", () => {

    let manager: PersonManager;
    const testPerson1: any = {
        "name": "Bob Johnson",
        "title": "Product Manager",
        "email": "b.johnson@dev.ca",
        "packages": []
    };
    const testPerson2: any = {
        "name": "Steven Kim",
        "title": "UI/UX Engineer",
        "packages": [
            {
                "id": "4200df4a-5d6e-4750-911c-c3aaaa1e6ca5",
                "arrivalDate": "12/24/2018, 12:58:47 PM",
                "pickupDate": ""
            },
            {
                "id": "4200df4a-4750-5d6e-911c-c3aaaa1e6ca5",
                "arrivalDate": "12/23/2018, 7:58:47 PM",
                "pickupDate": "12/24/2018, 12:58:47 PM"
            }
        ]
    };

    before(() => {

        try {
            manager = new PersonManager();
        } catch (err) {
            Log.warn("PersonManagerSpec::Failed to instantiate Manager");
        } finally {
            expect(manager).to.be.instanceOf(PersonManager);
        }
    });

    it("Should successfully load people from valid_persons.json", async () => {
        let loadValidPeople: () => Person[];
        let loadedPeople: Person[];
        loadValidPeople = manager["loadValidPeople"].bind(manager);
        try {
            loadedPeople = await loadValidPeople();
        } catch (err) {
            Log.warn("Failed to load people from directory");
            loadedPeople = err;
        } finally {
            for (const person of loadedPeople) {
                expect(person).to.be.instanceOf(Person);
            }
        }
    });

    it("Should return true for a valid person", async () => {
        const firstName: string = "Steven";
        const lastName: string = "Kim";
        let isValidPerson: boolean;

        try {
            isValidPerson = await manager.isValidPerson(firstName, lastName);
        } catch (err) {
            Log.warn("Failed to successfully validate a person");
            isValidPerson = err;
        } finally {
            expect(isValidPerson).to.be.true;
        }
    });

    it("Should not return true for an invalid person", async () => {
        let isValidPerson: boolean;

        try {
            isValidPerson = await manager.isValidPerson("Not", "AValidPerson");
        } catch (err) {
            Log.warn("Failed to successfully validate a person");
            isValidPerson = err;
        } finally {
            expect(isValidPerson).to.be.false;
        }
    });

    it("Should read a person successfully from disk (no prior deliveries)", () => {
        let createPerson: (p: any) => Person;
        createPerson = manager["createPerson"].bind(manager);
        const expectedPerson: Person = new Person("Bob", "Johnson", "b.johnson@dev.ca");
        expect(createPerson(testPerson1)).to.deep.equal(expectedPerson);
    });

    it("Should read a person successfully from disk (with prior deliveries)", () => {
        const packageIds: string[] = ["4200df4a-5d6e-4750-911c-c3aaaa1e6ca5", "4200df4a-4750-5d6e-911c-c3aaaa1e6ca5"];
        let createPerson: (p: any) => Person;
        createPerson = manager["createPerson"].bind(manager);
        let result: Person = createPerson(testPerson2);
        let resultPackageIds: Guid[] = result.getPackages().map((p) => p.getId());
        for (const pId of packageIds) {
            let idAsGuid: Guid = Guid.parse(pId);
            expect(resultPackageIds).to.deep.include(idAsGuid);
        }
    });
});
