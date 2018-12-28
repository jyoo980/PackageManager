import { Guid } from "guid-typescript";
import IPackage from "./interfaces/IPackage";
import Person from "./Person";

export default class Package implements IPackage {

    private readonly id: Guid;
    private readonly firstName: string;
    private readonly lastName: string;
    private readonly arrivalDate: Date;
    private pickupDate: Date;

    constructor(recipient: Person, id?: Guid, arrivalDate?: Date, pickupDate?: Date) {
        this.id = (id) ? id: Guid.create();
        this.firstName = recipient.getFirstName();
        this.lastName = recipient.getLastName();
        this.arrivalDate = (arrivalDate)? arrivalDate : new Date();
        this.pickupDate = (pickupDate) ? pickupDate : null;
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
        return this.arrivalDate;
    }

    public getPickupDate(): Date {
        return this.pickupDate;
    }

    public setPickupDate(date: Date): string {
        this.pickupDate = date;
        return this.pickupDate.toLocaleString();
    }

    public isPickedUp(): boolean {
        return this.pickupDate !== null;
    }

}