import IObserver from "./interfaces/IObserver";
import Person from "./Person";
import IPackage from "./interfaces/IPackage";
import config from "../../config/slack_config.json"
import * as slack from "typed-slack";
import {IncomingWebhook} from "typed-slack";

class SlackError extends Error {
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

    public async update(subject: Person, pkg: IPackage): Promise<boolean> {
        return Promise.reject("Not Implemented");
    }

    private async postToChannel(id: string): Promise<any> {
        return Promise.reject("Not Implemented");
    }

    private generateOpts(pkg: IPackage): any {
        return null;
    }
}