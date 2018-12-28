import IPackage from "../interfaces/IPackage";
import Package from "../Package";
import {Guid} from "guid-typescript";
import Person from "../Person";

export default class RecordProcessor {

    public static processRecords(records: any[]): IPackage[] {
        let pkgs: IPackage[] = [];
        for (const record of records) {
            pkgs.push(RecordProcessor.getPackage(record));
        }
        return pkgs as IPackage[];
    }

    public static generateInsertDocument(pkg: IPackage): any {
        const primaryKey: string = pkg.getId().toString();
        return {
            _id: primaryKey,
            firstName: pkg.getFirstName(),
            lastName: pkg.getLastName(),
            arrivalDate: pkg.getArrivalDate(),
            pickupDate: pkg.getPickupDate(),
        }
    }

    public static generateUpdateDocument(pkg: IPackage): any {
        return {
            $set: {
                pickupDate: pkg.getPickupDate()
            }
        }
    }

    private static getPackage(record: any) {
        const firstName: string = record.firstName;
        const lastName: string = record.lastName;
        const arrivalDate: Date = record.arrivalDate;
        const pickupDate: Date = (record.pickupDate) ? record.pickupDate : null;
        const id: Guid = Guid.parse(record._id);
        return new Package(new Person(firstName, lastName), id, arrivalDate, pickupDate);
    }
}