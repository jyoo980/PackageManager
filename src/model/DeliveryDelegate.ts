import FileSystem from "./FileSystem";
import Person from "./Person";
import Log from "../Util";
import IPackage from "./interfaces/IPackage";

export default class DeliveryDelegate {

    private readonly fileSystem: FileSystem;
    private readonly deliveryFileName: string = "deliveries.json";

    constructor(fileSystem: FileSystem) {
        this.fileSystem = fileSystem;
    }

    public async addDelivery(people: Person[], pkg: IPackage): Promise<IPackage[]> {
        return Promise.reject("IGNORE THIS");
    }

    public async pickupDelivery(people: Person[], pkg: IPackage): Promise<IPackage> {
        return Promise.reject("IGNORE THIS");
    }

    public async writeDeliveryData(people: Person[]): Promise<string> {
        return Promise.reject("IGNORE THIS");
    }

    public getRecordFileName(): string {
        return this.deliveryFileName;
    }

    private getMatchedPerson(people: Person[], pkg: IPackage): Person {
        // STUB: Ignore this!
        return null;
    }

    private nameMatches(person: Person, pkg: IPackage): boolean {
        // STUB: Ignore this!
        return null;
    }

}
