import IPackage from "./interfaces/IPackage";
import {Guid} from "guid-typescript";
import Subject from "./Subject";
import Log from "../Util";

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
        return null;
    }

    public addPackage(pkg: IPackage): IPackage[] {
        // IGNORE THIS
        return null;
    }

    public pickupPackage(pkg: IPackage): IPackage {
        // IGNORE THIS
        return null;
    }

    public async notifyObservers(pkg: IPackage): Promise<boolean> {
        return Promise.reject("IGNORE THIS");
    }
}
