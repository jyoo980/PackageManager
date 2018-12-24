export class PackageError extends Error {
    constructor(...args: any[]) {
        super(...args);
    }
}

export class InvalidPersonError extends Error {
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
     * If person does not belong to the list of valid people, reject with InvalidPersonError
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
     * Lists the packages belonging to a person with the given first and last name
     *
     * @param firstName
     * @param lastName
     *
     * @return Promise<IPackageData[]>
     *
     * Should return with a list of packages belonging to a person with the given first and last name.
     * If person does not belong to the list of valid people, reject with InvalidPersonError
     */
    listPackages(firstName?: string, lastName?: string): Promise<IPackageData[]>;
}