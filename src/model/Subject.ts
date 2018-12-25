import IObserver from "./interfaces/IObserver";
import IPackage from "./interfaces/IPackage";

export class DuplicateObserverError extends Error {
    constructor(...args: any[]) {
        super(...args);
    }
}

export default abstract class Subject {

    protected observers: IObserver[];

    protected constructor() {
        this.observers = [];
    }

    abstract notifyObservers(pkg: IPackage): Promise<boolean>;

    public registerObserver(obs: IObserver): IObserver[] {
        if (!this.observers.includes(obs)) {
            this.observers.push(obs);
            return this.observers;
        }
        throw new DuplicateObserverError("Subject::Attempted to add duplicate observer");
    }

    public deregisterObserver(obs: IObserver): IObserver[] {
        this.observers = this.observers.filter((observer) => {
            return observer !== obs;
        });
        return this.observers;
    }
}