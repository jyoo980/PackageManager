import IObserver from "./interfaces/IObserver";
import IPackage from "./interfaces/IPackage";
import Person from "./Person";
import * as nodeMailer from "NodeMailer";
import config from "../../config/mail_config.json";

export default class Mailer implements IObserver {

    private readonly mailTransport: any;

    constructor() {
        this.mailTransport = nodeMailer.createTransport(config.transportOpts);
    }

    public update(subject: Person, pkg: IPackage): Promise<boolean> {
        // TODO: stub
        return Promise.reject("Not implemented");
    }

    private generateMailOpts(recipient: Person, pkg: IPackage): any {
        const sender: string = this.mailTransport.options.auth.user;
        const arrivalDate: string = pkg.getArrivalDate().toLocaleString();
        return {
            from: sender,
            subject: "A package has arrived for you!",
            text: `Hi, ${pkg.getFirstName()}. A package arrived for you today at: ${arrivalDate}`,
            replyTo: sender
        };
    }
}