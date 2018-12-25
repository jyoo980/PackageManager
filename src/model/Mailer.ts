import IObserver from "./interfaces/IObserver";
import IPackage from "./interfaces/IPackage";
import Person from "./Person";

export default class Mailer implements IObserver {

    // TODO: implement

    update(subject: Person, pkg: IPackage): boolean {
        // TODO: stub
        return false;
    }

}