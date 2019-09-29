import Person from "./Person";
import FileSystem from "./FileSystem";
import DeliveryDelegate from "./DeliveryDelegate";

export default class PersonManager {

    private readonly fileSystem: FileSystem = new FileSystem("./data");
    private readonly validPeople: Person[];
    private readonly deliveryDelegate: DeliveryDelegate;
    private peopleFileCopy: any;

    constructor() {
        // IGNORE THIS
    }

    public async isValidPerson(firstName: string, lastName: string): Promise<boolean> {
        return Promise.reject("IGNORE THIS");
    }

    private async loadValidPeople(): Promise<Person[]> {
        return Promise.reject("IGNORE THIS");
    }

    private populateValidPeople(): Person[] {
        // IGNORE THIS
        return null;
    }

    private createPerson(personJson: any): Person {
        // IGNORE THIS
        return null;
    }

    private readPackages(person: Person, packageArray: any[]) {
        // IGNORE THIS
    }
}
