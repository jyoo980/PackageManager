import IObserver from "./interfaces/IObserver";
import IPackage from "./interfaces/IPackage";
import Person from "./Person";
import * as nodeMailer from "NodeMailer";
import config from "../../config/mail_config.json";
import Log from "../Util";

export class NotificationSendError extends Error {
    constructor(...args: any[]) {
        super(...args);
    }
}

export default class Mailer implements IObserver {

    private readonly mailTransport: any;

    constructor() {
        this.mailTransport = nodeMailer.createTransport(config.transportOpts);
    }

    public async update(subject: Person, pkg: IPackage): Promise<boolean> {
        const mailOptions: any = this.generateMailOpts(subject, pkg);
        try {
            return await this.sendEmail(mailOptions);
        } catch (err) {
            throw err;
        }
    }

    private sendEmail(opts: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
           this.mailTransport.sendMail(opts, (err: Error) => {
                if (!err) {
                    resolve(true);
                } else {
                    Log.warn(`Mailer::Failed to send with error: ${err}`);
                    reject(new NotificationSendError(`Mailer::Failed to send with error: ${err}`));
                }
           });
        });
    }

    private generateMailOpts(recipient: Person, pkg: IPackage): any {
        const sender: string = this.mailTransport.options.auth.user;
        const arrivalDate: string = pkg.getArrivalDate().toLocaleString();
        return {
            from: sender,
            to: recipient.getEmail(),
            subject: "A package has arrived for you!",
            text: `Hi, ${recipient.getFirstName()}. A package arrived for you today at: ${arrivalDate}`,
            replyTo: sender
        };
    }
}