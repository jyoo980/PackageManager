import IPackage from "./IPackage";
import Person from "../Person";

export default interface IObserver {

    update(subject: Person, pkg: IPackage): Promise<boolean>;
}
