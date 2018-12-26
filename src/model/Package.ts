import { Guid } from "guid-typescript";
import IPackage from "./interfaces/IPackage";
import Person from "./Person";

export default class Package implements IPackage {

    private readonly id: Guid;
    private readonly firstName: string;
    private readonly lastName: string;
    private readonly arrivalDate: string;
    private pickupDate: string;

    constructor(recipient: Person, id?: Guid, arrivalDate?: string, pickupDate?: string) {
        this.id = (id) ? id: Guid.create();
        this.firstName = recipient.getFirstName();
        this.lastName = recipient.getLastName();
        this.arrivalDate = (arrivalDate)? arrivalDate : Date().toLocaleString();
        this.pickupDate = (pickupDate) ? pickupDate : "";
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

    getEmail(): string {
        return "";
    }

}