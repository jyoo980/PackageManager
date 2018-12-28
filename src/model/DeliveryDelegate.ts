import FileSystem, {FileSystemError} from "./FileSystem";
import Person from "./Person";
import Log from "../Util";
import IPackage from "./interfaces/IPackage";

export class UnrecognizedPersonError extends Error {
    constructor(...args: any[]) {
        super(...args);
    }
}

export default class DeliveryDelegate {

    private readonly fileSystem: FileSystem;
    private readonly deliveryFileName: string = "deliveries.json";

    constructor(fileSystem: FileSystem) {
        this.fileSystem = fileSystem;
    }

    public async addDelivery(people: Person[], pkg: IPackage): Promise<IPackage[]> {
        try {
            const recipient = this.getMatchedPerson(people, pkg);
            const recipientPackages = recipient.addPackage(pkg);
            await recipient.notifyObservers(pkg);
            await this.writeDeliveryData(people);
            return recipientPackages;
        } catch (err) {
            throw err;
        }
    }

    public async writeDeliveryData(people: Person[]): Promise<string> {
        try {
            return await this.fileSystem.writeFile(this.deliveryFileName, people);
        } catch (err) {
            Log.warn(`DeliveryDelegate::Failed to update records:${err}`);
            throw new FileSystemError(`DeliveryDelegate::Synchronization Errors Likely, check data on disk`);
        }
    }

    public getRecordFileName(): string {
        return this.deliveryFileName;
    }

    private getMatchedPerson(people: Person[], pkg: IPackage): Person {
        for (const person of people) {
            if (this.nameMatches(person, pkg)) {
                return person;
            }
        }
        throw new UnrecognizedPersonError(`Person with name: ${pkg.getFirstName()} ${pkg.getLastName()} does not exist`);
    }

    private nameMatches(person: Person, pkg: IPackage): boolean {
        return person.getFirstName() === pkg.getFirstName()
            && person.getLastName() === pkg.getLastName();
    }

}