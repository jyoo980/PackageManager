import FileSystem, {FileSystemError} from "./FileSystem";
import Person from "./Person";
import Log from "../Util";

export default class DeliveryDelegate {

    private readonly fileSystem: FileSystem;
    private readonly deliveryFileName: string = "deliveries.json";

    constructor(fileSystem: FileSystem) {
        this.fileSystem = fileSystem;
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








}