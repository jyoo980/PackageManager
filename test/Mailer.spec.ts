import Log from "../src/Util";
import {expect} from "chai";
import Mailer, {NotificationSendError} from "../src/model/Mailer";
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

    it("Should generate mail options for a given person and a package arrival", () => {
        const tstDate: Date = new Date();
        const tstPkg: MockPackage = new MockPackage(Guid.create(), tstDate, false);
        const tstPerson: Person = new Person("John", "Smith", "john.smith@dev.com");
        const expectedOpts = {
            from: config.transportOpts.auth.user,
            to: tstPerson.getEmail(),
            subject: "A package has arrived for you!",
            text: `Hi, ${tstPkg.getFirstName()}. A package has arrived for you at: ${tstDate.toLocaleString()}`,
            replyTo: config.transportOpts.auth.user
        };
        expect(generateMailOpts(tstPerson, tstPkg)).to.deep.equal(expectedOpts);
    });

    it("Should generate mail options for a given person and package pickup", () => {
        const tstDate: Date = new Date();
        const tstPkg: MockPackage = new MockPackage(Guid.create(), tstDate, true);
        const tstPerson: Person = new Person("John", "Smith", "john.smith@dev.com");
        const expectedOpts = {
            from: config.transportOpts.auth.user,
            to: tstPerson.getEmail(),
            subject: "Thanks for picking up your package!",
            text: `Hi, ${tstPkg.getFirstName()}. Your package was picked up at: ${tstDate.toLocaleString()}`,
            replyTo: config.transportOpts.auth.user
        };
        expect(generateMailOpts(tstPerson, tstPkg)).to.deep.equal(expectedOpts);
    });

    it("Should throw a NotificationSendError for an invalid email address", async () => {
        const tstPkg: MockPackage = new MockPackage(Guid.create(), new Date(), false);
        const tstPerson: Person = new Person("John", "Smith", "");
        let sendResult: any;
        try {
            sendResult = await mail.update(tstPerson, tstPkg);
        } catch (err) {
            sendResult = err;
        } finally {
            expect(sendResult).to.be.instanceOf(NotificationSendError);
        }
    });

    it("Should be able to send an email successfully", async () => {
        const tstPkg: MockPackage = new MockPackage(Guid.create(), new Date(), false);
        const tstPerson: Person = new Person("John", "Smith", "jyoo980+1@gmail.com");
        let sendResult: boolean;
        try {
            sendResult = await mail.update(tstPerson, tstPkg);
        } catch (err) {
            sendResult = err;
        } finally {
            expect(sendResult).to.be.true;
        }
    });
});