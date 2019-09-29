import IObserver from "./interfaces/IObserver";
import IPackage from "./interfaces/IPackage";

export default abstract class Subject {

    protected observers: IObserver[];

    protected constructor() {
        this.observers = [];
    }

    abstract notifyObservers(pkg: IPackage): Promise<boolean>;

    public registerObserver(obs: IObserver): IObserver[] {
        // IGNORE THIS
        return null;
    }

    public deregisterObserver(obs: IObserver): IObserver[] {
        // IGNORE THIS
        return null;
    }
}
