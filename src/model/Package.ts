import { Guid } from "guid-typescript";
import IPackageInfo from "./IPackageInfo";

export default class Package implements IPackageInfo {

    private id: Guid;
    private firstName: string;
    private lastName: string;
    private arrivalDate: string;
    private pickupDate: string;

    constructor(firstName: string, lastName: string) {
        this.id = Guid.create();
        this.firstName = firstName;
        this.lastName = lastName;
        this.arrivalDate = new Date().toLocaleString();
        this.pickupDate = "";
    }

    public getId(): Guid {
        return this.id;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getArrivalDate(): Date {
        return new Date(this.arrivalDate);
    }

    public getPickupDate(): Date {
        return new Date(this.pickupDate);
    }

    public setPickupDate(date: Date): string {
        this.pickupDate = date.toLocaleString();
        return this.pickupDate;
    }

}