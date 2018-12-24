import FileSystem, {FileSystemError} from "./FileSystem";
import Person from "./Person";
import Log from "../Util";

export default class PersonValidator {

    private readonly fileSystem: FileSystem = new FileSystem("./data");
    private readonly validPeople: Person[];
    private peopleFileCopy: any;

    constructor() {
        this.validPeople = [];
    }

    public isValidPerson(firstName: string, lastName: string): boolean {
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
        // TODO: additional processing if they have objects
        return new Person(nameArray[0], nameArray[1]);
    }


}