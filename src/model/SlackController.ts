import IObserver from "./interfaces/IObserver";
import Person from "./Person";
import IPackage from "./interfaces/IPackage";
import config from "../../config/slack_config.json"
import * as slack from "typed-slack";
import {IncomingWebhook} from "typed-slack";
import Log from "../Util";

export class SlackError extends Error {
    constructor(...args: any[]) {
        super(...args);
    }
}

export default class SlackController implements IObserver {

    private readonly webHook: IncomingWebhook;

    constructor(hook?: IncomingWebhook) {
        if (hook) {
            this.webHook = hook;
        } else {
            this.webHook = new slack.IncomingWebhook(config.hook_url);
        }
    }

    public update(subject: Person, pkg: IPackage): Promise<boolean> {
        const opts: any = this.generateOpts(pkg);
        return new Promise((resolve, reject) => {
            this.webHook.send(opts)
                .then(resolve(true))
                .catch((err: Error) => {
                    const errMsg: string = `SlackControlller::Failed to post message with opts: ${opts}, with error: ${err}`;
                    Log.warn(errMsg);
                    reject(new SlackError(errMsg));
                });
        });
    }

    private generateOpts(pkg: IPackage): any {
        const first: string = pkg.getFirstName();
        const last: string = pkg.getLastName().toLowerCase();
        const channelId: string = `@${first.toLowerCase()}.${last}`;
        const msgText: string = `Hi, ${first}. You received a package at: ${pkg.getArrivalDate().toLocaleString()}`;
        return {
            channel: channelId,
            text: msgText
        }
    }
}