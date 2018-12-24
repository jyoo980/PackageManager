import {expect} from "chai";
import {InvalidPersonError, IPackageManager, PackageError} from "../src/controller/IPackageManager";
import Log from "../src/Util";
import PackageManager from "../src/controller/PackageManager";

describe("PackageManagerFacade Tests", () => {

    let managerFacade: IPackageManager;

    before(() => {

        try {
            managerFacade = new PackageManager();
        } catch (err) {
            Log.warn("PackageMangerSpec::Failed to instantiate PackageManager");
        } finally {
            expect(managerFacade).to.be.instanceOf(PackageManager);
        }
    });

    it("Should successfully add a package", async () => {
        const first: string = "John";
        const last: string = "Smith";
        let packageIds: string[] = [];
        try {
            packageIds = await managerFacade.addPackage(first, last);
        } catch (err) {
            Log.warn("PackageManagerSpec::Failed to add a package for testing");
            packageIds = err;
        } finally {
            expect(packageIds).length.to.not.equal(0);
        }
    });

    it("Should return a PackageError given an invalid name (empty string)", async () => {
        const last: string = "Smith";
        let packageIds: string[] = [];
        try {
            packageIds = await managerFacade.addPackage("", last);
        } catch (err) {
            packageIds = err;
        } finally {
            expect(packageIds).to.be.instanceof(PackageError);
        }
    });

    it("Should return a PackageError given an invalid name (null)", async () => {
        const last: string = "Smith";
        let packageIds: string[] = [];
        try {
            packageIds = await managerFacade.addPackage(null, last);
        } catch (err) {
            packageIds = err;
        } finally {
            expect(packageIds).to.be.instanceOf(PackageError);
        }
    });

    it("Should return a PackageError given an invalid name (undefined)", async () => {
        const last: string = "Smith";
        let packageIds: string[] = [];
        try {
            packageIds = await managerFacade.addPackage(undefined, last);
        } catch (err) {
            packageIds = err;
        } finally {
            expect(packageIds).to.be.instanceOf(PackageError);
        }
    });

    it("Should return an InvalidPersonError when a package is added for an unknown person", async () => {
        const first: string = "Not";
        const last: string = "ValidPerson";
        let packageIds: string[] = [];
        try {
            packageIds = await managerFacade.addPackage(first, last);
        } catch (err) {
            packageIds = err;
        } finally {
            expect(packageIds).to.be.instanceOf(InvalidPersonError);
        }
    });

});