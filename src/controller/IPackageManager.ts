export class PackageError extends Error {
    constructor(...args: any[]) {
        super(...args);
    }
}

export interface IPackageData {
    id: string,
    firstName: string,
    lastName: string,
    arrivalDate: Date,
    pickupDate?: Date
}

export interface IPackageManager {

    /**
     * Adds a package to this package manager
     * @param firstName
     * @param lastName
     *
     * @return Promise<string[]>
     *
     * If addition is successful, it should resolve with a promise with an array containing the ids of all
     * packages contained within this instance of package manager.
     *
     */
    addPackage(firstName: string, lastName: string): Promise<string[]>;

    /**
     * Invoked when the recipient of a package picks up a package
     * @param id
     *
     * If pickup is successful, it should resolve with a promise which contains the id of the package
     * which was picked up
     */
    pickupPackage(id: string): Promise<string>;

    /**
     * Lists the packages which are already contained within this instance of package manager
     *
     * @returns Promise<IPackageManager[]>
     */
    listPackages(): Promise<IPackageData[]>;
}