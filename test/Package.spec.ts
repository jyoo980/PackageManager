import {expect} from "chai";
import Package from "../src/model/Package";
import {Guid} from "guid-typescript";

describe("Package Tests", () => {

    it("Should generate a proper guid", () => {
        let pkg: Package = new Package("John", "Smith");
        expect(pkg.getId()).to.be.instanceOf(Guid);
    });

    it("Should be able to successfully set the pickup date", () => {
        let pkg: Package = new Package("John", "Smith");
        const pickupTime: Date = new Date();
        const timeAsString: string = pickupTime.toLocaleString();
        expect(pkg.setPickupDate(pickupTime)).to.equal(timeAsString);
    });

    it("Should be able to get the first and last name", () => {
        let pkg: Package = new Package("John", "Smith");
        expect(pkg.getFirstName()).to.equal("John");
        expect(pkg.getLastName()).to.equal("Smith");
    });

    it("Should be able to get the pickup date", () => {
        let pkg: Package = new Package("John", "Smith");
        const pickupTime: Date = new Date();
        const timeAsString: string = pickupTime.toLocaleString();
        pkg.setPickupDate(pickupTime);
        expect(pkg.getPickupDate().toLocaleString()).to.equal(timeAsString);
    });

    it("Should be able to get the arrival date", () => {
        let pkg: Package = new Package("John", "Smith");
        expect(pkg.getArrivalDate()).to.be.instanceOf(Date);
    });
});