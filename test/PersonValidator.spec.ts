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
            // TODO: finish this test
        }
    });

});
