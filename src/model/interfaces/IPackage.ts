import {Guid} from "guid-typescript";

export class DuplicatePackageError extends Error {
    constructor(...args: any[]) {
        super(...args);
    }
}

export default interface IPackage {

    /**
     * Returns the unique identifier associated with a given package
     *
     * @return Guid
     */
    getId(): Guid;

    /**
     * @return string
     */
    getFirstName(): string;

    /**
     * @return string
     */
    getLastName(): string;

    /**
     * @return Date
     */
    getArrivalDate(): Date;

    /**
     * @return Date
     */
    getPickupDate(): Date;

    /**
     * @return true iff the package has been picked up
     */
    isPickedUp(): boolean;
}