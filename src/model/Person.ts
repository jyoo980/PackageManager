import IPackage, {DuplicatePackageError} from "./interfaces/IPackage";
import {Guid} from "guid-typescript";

export default class Person {

    private readonly firstName: string;
    private readonly lastName: string;
    private packages: IPackage[];

    constructor(firstName: string, lastName: string) {
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
        const idToAdd: Guid = pkg.getId();
        const packageIds: Guid[] = this.getPackageIds();
        if (!packageIds.includes(idToAdd)) {
            this.packages.push(pkg);
            return this.packages;
        } else {
            throw new DuplicatePackageError(`Package with id: ${idToAdd} already exists`);
        }
    }

    private getPackageIds(): Guid[] {
        return this.packages.map(p => p.getId());
    }
}