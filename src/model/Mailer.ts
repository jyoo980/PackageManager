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
        return {
            from: sender,
            to: recipient.getEmail(),
            subject: this.getSubjectLine(pkg),
            text: this.getMailText(pkg),
            replyTo: sender
        };
    }

    private getSubjectLine(pkg: IPackage): string {
        if (pkg.isPickedUp()) {
            return  "Thanks for picking up your package!";
        } else {
            return `A package has arrived for you!`;
        }
    }

    private getMailText(pkg: IPackage) {
        const pre: string = `Hi, ${pkg.getFirstName()}.`;
        if (pkg.isPickedUp()) {
            return `${pre} Your package was picked up at: ${pkg.getPickupDate().toLocaleString()}`;
        } else {
            return `${pre} A package has arrived for you at: ${pkg.getArrivalDate().toLocaleString()}`;
        }
    }
}