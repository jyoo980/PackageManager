import IPackage from "./IPackage";
import Person from "../Person";

export class NotificationError extends Error {
    constructor(...args: any[]) {
        super(...args);
    }
}

export default interface IObserver {

    /**
     *
     * Method invoked when a delivery is picked up by the recipient, should be used to
     * send a notification regarding a delivery to the recipient, either via email or
     * some other means of communication
     *
     * @param subject
     * @param pkg
     *
     * @return boolean
     */
    update(subject: Person, pkg: IPackage): Promise<boolean>;
}