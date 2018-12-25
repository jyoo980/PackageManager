import Log from "../src/Util";
import {expect} from "chai";
import FileSystem, {FileSystemError} from "../src/model/FileSystem";

describe("FileSystem Tests", () => {

    let fileSystem: FileSystem;
    const testRootPath: string = "./test/data";
    const fileToWrite: string = "test_write.json";
    const storedData: any = {
        "apple": 1,
        "foo": "abc",
        "bar": [
            1, 2, 3
        ]
    };

    before(() => {

        try {
            fileSystem = new FileSystem(testRootPath);
        } catch (err) {
            Log.warn("FileSystemSpec::Failed to instantiate FileSystem");
        } finally {
            expect(fileSystem).to.be.instanceOf(FileSystem);
        }
    });

    after(async () => {

        try {
            await FileSystem.deleteFile(fileToWrite, testRootPath);
        } catch (err) {
            Log.warn(`FileSystemSpec::Teardown failed with err: ${err}`);
            expect.fail(`FileSystemSpec::Teardown failed with err: ${err}`);
        }
    });

    it("Should return the root directory", () => {
        const rootDir: string = fileSystem.getRoot();
        expect(rootDir).to.equal(testRootPath);
    });

    it("Should be able to set the root directory", () => {
        const newRoot: string = "./rootDirNew";
        expect(fileSystem.setRoot(newRoot)).to.equal(newRoot);
        expect(fileSystem.setRoot(testRootPath)).to.equal(testRootPath);
    });

    it("Should throw a FileSystemError when attempting to read a non-existent file", async () => {
        const fileName: string = "foo.txt";
        let readResult: any;
        try {
            readResult = await fileSystem.readFile(fileName);
        } catch (err) {
            readResult = err;
        } finally {
            expect(readResult).to.be.instanceOf(FileSystemError);
        }
    });

    it("Should read a file successfully from disk", async () => {
        const fileName: string = "sample_data.json";
        let readResult: any;
        try {
            readResult = await fileSystem.readFile(fileName);
        } catch (err) {
            readResult = err;
            expect.fail("FileSystemSpec::Reading an existing file from disk should not have failed");
        } finally {
            expect(readResult).to.deep.equal(storedData);
        }
    });

    it("Should write a file successfully to disk", async () => {
        const dataAsJson: any = {"foo": [1, 2, 3], "bar": "2"};
        let writeResult: any;
        try {
            writeResult = await fileSystem.writeFile(fileToWrite, dataAsJson);
        } catch (err) {
            writeResult = err;
            expect.fail("FileSystemSpec::Writing a new file to disk should not have failed");
        } finally {
            expect(writeResult).to.equal(JSON.stringify(dataAsJson));
        }
    });

    it("Should be able to read a file that has been written to disk", async () => {
        const dataAsJson: any = {"foo": [1, 2, 3], "bar": "2"};
        let readResult: any;
        try {
            readResult = await fileSystem.readFile(fileToWrite);
        } catch (err) {
            Log.warn("FileSystemSpec::Was not able to read file written to disk");
            readResult = err;
        } finally {
            expect(readResult).to.deep.equal(dataAsJson);
        }
    });

    it("Should be able to modify a file after it has been written", async () => {
        const modifiedData: any = {"foo": [1, 2, 2.5, 3], "bar": "2", "baz": 1};
        let readResult: any;
        try {
            await fileSystem.writeFile(fileToWrite, modifiedData);
            readResult = await fileSystem.readFile(fileToWrite);
        } catch (err) {
            Log.warn("FileSystemSpec::Was not able to modify data written to disk");
            readResult = err;
        } finally {
            expect(readResult).to.deep.equal(modifiedData);
        }
    });

});