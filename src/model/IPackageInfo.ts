import {Guid} from "guid-typescript";

export default interface IPackageInfo {

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
}