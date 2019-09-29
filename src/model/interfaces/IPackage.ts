import {Guid} from "guid-typescript";


export default interface IPackage {

    getId(): Guid;

    getFirstName(): string;

    getLastName(): string;

    getArrivalDate(): Date;

    getPickupDate(): Date;

    isPickedUp(): boolean;

    setPickupDate(date: Date): string;
}
