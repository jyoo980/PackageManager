import Log from "../src/Util";
import {expect} from "chai";
import PersonValidator from "../src/model/PersonValidator";
import Person from "../src/model/Person";

describe("PersonValidator Tests", () => {

    let validator: PersonValidator;

    before(() => {

        try {
            validator = new PersonValidator();
        } catch (err) {
            Log.warn("PersonValidatorSpec::Failed to instantiate Validator");
        } finally {
            expect(validator).to.be.instanceOf(PersonValidator);
        }
    });

    it("Should successfully load people from valid_persons.json", async () => {
        let loadValidPeople: () => Person[];
        let loadedPeople: Person[];
        loadValidPeople = validator["loadValidPeople"].bind(validator);
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
            isValidPerson = await validator.isValidPerson(firstName, lastName);
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
            isValidPerson = await validator.isValidPerson("Not", "AValidPerson");
        } catch (err) {
            Log.warn("Failed to successfully validate a person");
            isValidPerson = err;
        } finally {
            expect(isValidPerson).to.be.false;
        }
    });

});
