import IObserver from "../../src/model/interfaces/IObserver";
import IPackage from "../../src/model/interfaces/IPackage";
import Person from "../../src/model/Person";

export class MockObserver implements IObserver {

    public update(person: Person, pkg: IPackage): boolean {
        return true;
    }
}