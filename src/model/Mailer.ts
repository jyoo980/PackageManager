import IObserver from "./interfaces/IObserver";
import IPackage from "./interfaces/IPackage";
import Person from "./Person";
import * as nodeMailer from "NodeMailer";
import config from "../../config/mail_config.json";
import * as Mail from "nodemailer/lib/mailer";

export default class Mailer implements IObserver {

    private readonly mailTransport: Mail;

    constructor() {
        this.mailTransport = nodeMailer.createTransport(config.transportOpts);
    }

    public update(subject: Person, pkg: IPackage): Promise<boolean> {
        // TODO: stub
        return Promise.reject("Not implemented");
    }

}