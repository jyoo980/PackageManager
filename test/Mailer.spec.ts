import Log from "../src/Util";
import {expect} from "chai";
import Mailer from "../src/model/Mailer";
import {MockPackage} from "./mocks/MockPackage";
import {Guid} from "guid-typescript";
import config from "../config/mail_config.json";
import Person from "../src/model/Person";
import IPackage from "../src/model/interfaces/IPackage";

describe("Mailer Tests", () => {

    let generateMailOpts: (recipient: Person, pkg: IPackage) => any;
    let mail: Mailer;

    before(() => {
        try {
            mail = new Mailer();
            generateMailOpts = mail["generateMailOpts"].bind(mail);
        } catch (err) {
            Log.warn("MailerSpec::Failed to instantiate instance of Mailer for testing");
            mail = err;
        } finally {
            expect(mail).to.be.instanceOf(Mailer);
        }
    });

    it("Should generate mail options for a given person and their package", () => {
        const tstDate: Date = new Date();
        const tstPkg: MockPackage = new MockPackage(Guid.create(), tstDate, "james.yoo@gmail.com");
        const tstPerson: Person = new Person("John", "Smith");
        const expectedOpts = {
            from: config.transportOpts.auth.user,
            subject: "A package has arrived for you!",
            text: `Hi, ${tstPkg.getFirstName()}. A package arrived for you today at: ${tstDate.toLocaleString()}`,
            replyTo: config.transportOpts.auth.user
        };
        expect(generateMailOpts(tstPerson, tstPkg)).to.deep.equal(expectedOpts);
    });



});