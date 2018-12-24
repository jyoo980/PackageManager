import Log from "../src/Util";
import {expect} from "chai";
import FileSystem, {FileSystemError} from "../src/model/FileSystem";

describe("FileSystem Tests", () => {

    let fileSystem: FileSystem;
    const testRootPath: string = "./test/data";
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

    it("Should return the root directory", () => {
        const rootDir: string = fileSystem.getRoot();
        expect(rootDir).to.equal(testRootPath);
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
        const fileName: string = "test_write.json";
        try {
            writeResult = await fileSystem.writeFile(fileName, dataAsJson);
        } catch (err) {
            writeResult = err;
            expect.fail("FileSystemSpec::Writing a new file to disk should not have failed");
        } finally {
            expect(writeResult).to.equal(JSON.stringify(dataAsJson));
        }
    })

});