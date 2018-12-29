import IPackage, {DuplicatePackageError} from "./interfaces/IPackage";
import {Guid} from "guid-typescript";
import Subject from "./Subject";
import Log from "../Util";
import {NotificationError} from "./interfaces/IObserver";

export default class Person extends Subject {

    private readonly firstName: string;
    private readonly lastName: string;
    private readonly email: string;
    private packages: IPackage[];

    constructor(firstName: string, lastName: string, email?: string) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.packages = [];
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPackages(): IPackage[] {
        return this.packages;
    }

    public addPackage(pkg: IPackage): IPackage[] {
        if (!this.packages.includes(pkg)) {
            this.packages.push(pkg);
            return this.packages;
        } else {
            throw new DuplicatePackageError(`Package with id: ${pkg.getId()} already exists`);
        }
    }

    public pickupPackage(pkg: IPackage): IPackage {
        pkg.setPickupDate(new Date());
        return pkg;
    }

    public async notifyObservers(pkg: IPackage): Promise<boolean> {
        const observerNotify = this.observers.map((obs) => obs.update(this, pkg));
        try {
            await Promise.all(observerNotify);
            return true;
        } catch (err) {
            Log.warn(`Person::Failed to notify observers with error: ${err}`);
            throw new NotificationError(`Person::Failed to notify observers with error: ${err}`)
        }
    }
}