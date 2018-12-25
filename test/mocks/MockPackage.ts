import IPackage from "../../src/model/interfaces/IPackage";
import {Guid} from "guid-typescript";

export class MockPackage implements IPackage {

    private readonly id: Guid;
    private readonly testDate: Date;

    constructor(id: Guid, testDate: Date) {
        this.id = id;
        this.testDate = testDate;
    }

    public getArrivalDate(): Date {
        return this.testDate;
    }

    public getFirstName(): string {
        return "Mock";
    }

    public getId(): Guid {
        return this.id;
    }

    public getLastName(): string {
        return "Package";
    }

    public getPickupDate(): Date {
        return this.testDate;
    }
}