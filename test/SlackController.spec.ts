import IPackage from "../src/model/interfaces/IPackage";
import Log from "../src/Util";
import {expect} from "chai";
import SlackController, {SlackError} from "../src/model/SlackController";
import Package from "../src/model/Package";
import Person from "../src/model/Person";

describe("SlackController Tests", () => {

    let slack: SlackController;
    let generateOpts: (pkg: IPackage) => any;

    before(() => {
        try {
            slack = new SlackController();
            generateOpts = slack["generateOpts"].bind(slack);
        } catch (err) {
            Log.warn("SlackControllerSpec::Failed to instantiate SlackController");
            slack = err;
        } finally {
            expect(slack).to.be.instanceOf(SlackController);
        }
    });

    it("Should generate webhook options for a given package", () => {
        const tstDate: Date = new Date();
        const email: string = "john.smith@dev.ca";
        const tstPkg: IPackage = new Package(new Person("John", "Smith", email), null, tstDate);
        expect(generateOpts(tstPkg)).to.deep.equal({
            channel: "@john.smith",
            text: `Hi, John. You received a package at: ${tstDate.toLocaleString()}`
        });
    });

    it("Should throw a SlackError when given a faulty channel name", async () => {
        const tstPerson: Person = new Person("Faulty", "Message");
        const tstPkg: IPackage = new Package(tstPerson, null, new Date());
        let result: boolean;
        try {
            result = await slack.update(tstPerson, tstPkg);
        } catch (err) {
            result = err;
        } finally {
            expect(result).to.be.instanceOf(SlackError);
        }
    });
});