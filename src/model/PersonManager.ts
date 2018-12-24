import Person from "./Person";
import Log from "../Util";
import Package from "./Package";
import {Guid} from "guid-typescript";
import FileSystem from "./FileSystem";

export default class PersonManager {

    private readonly fileSystem: FileSystem = new FileSystem("./data");
    private readonly validPeople: Person[];
    private peopleFileCopy: any;

    constructor() {
        this.validPeople = [];
    }

    public async isValidPerson(firstName: string, lastName: string): Promise<boolean> {
        if (this.validPeople.length === 0) {
            try {
                await this.loadValidPeople();
            } catch (err) {
                Log.warn(err);
                return false;
            }
        }
        for (const person of this.validPeople) {
            if (person.getFirstName() === firstName && person.getLastName() === lastName) {
                return true;
            }
        }
        return false;
    }

    private async loadValidPeople(): Promise<Person[]> {
        try {
            this.peopleFileCopy = await this.fileSystem.readFile("valid_persons.json");
            return this.populateValidPeople();
        } catch (err) {
            Log.warn(err);
            throw err;
        }
    }

    private populateValidPeople(): Person[] {
        const peopleJson: any = this.peopleFileCopy.employees;
        for (const personJson of peopleJson) {
            const person = this.createPerson(personJson);
            this.validPeople.push(person);
        }
        return this.validPeople;
    }

    private createPerson(personJson: any): Person {
        const nameArray: string[] = personJson.name.split(" ");
        const packageArray: any[] = personJson.packages;
        let person = new Person(nameArray[0], nameArray[1]);
        if (packageArray.length != 0) {
            this.readPackages(person, packageArray);
        }
        return person;
    }

    private readPackages(person: Person, packageArray: any[]) {
        for (const p of packageArray) {
            const pkgGuid: Guid = Guid.parse(p.id);
            const readPackage = new Package(person.getFirstName(), person.getLastName(), pkgGuid, p.arrivalDate, p.pickupDate);
            person.addPackage(readPackage);
        }
    }

}