
export interface IPackageManager {

    addPackage(firstName: string, lastName: string): Promise<string[]>;

    pickupPackage(id: string): Promise<string>;

    listPackages(firstName?: string, lastName?: string): Promise<string[]>;
}
