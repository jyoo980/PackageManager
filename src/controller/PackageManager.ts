import {IPackageData, IPackageManager} from "./IPackageManager";

export default class PackageManager implements IPackageManager {

    public addPackage(firstName: string, lastName: string): Promise<string[]> {
        return Promise.reject("Not Implemented");
    }

    public pickupPackage(id: string): Promise<string> {
        return Promise.reject("Not Implemented");
    }

    listPackages(firstName?: string, lastName?: string): Promise<IPackageData[]> {
        return Promise.reject("Not Implemented");
    }

}