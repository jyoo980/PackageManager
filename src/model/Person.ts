import IPackage, {DuplicatePackageError} from "./interfaces/IPackage";
import {Guid} from "guid-typescript";
import Subject from "./Subject";

export default class Person extends Subject {

    private readonly firstName: string;
    private readonly lastName: string;
    private packages: IPackage[];

    constructor(firstName: string, lastName: string) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.packages = [];
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
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

    public notifyObservers(pkg: IPackage): void {
        for (const observer of this.observers) {
            observer.update(this, pkg);
        }
    }
}