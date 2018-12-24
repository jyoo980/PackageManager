import * as fs from "fs";

export class FileSystemError extends Error {
    constructor(...args: any[]) {
        super(...args);
    }
}

export default class FileSystem {

    private readonly fileSystemRoot: string;

    constructor(rootPath: string) {
        this.fileSystemRoot = rootPath;
    }

    public getRoot(): string {
        return this.fileSystemRoot;
    }

    public readFile(name: string): any {
        const path: string = this.constructPath(name);
        return new Promise((resolve, reject) => {
            fs.readFile(path, "utf-8", (err, content) => {
                if (!err) {
                    const contentAsJson = JSON.parse(content);
                    resolve(contentAsJson);
                } else {
                    reject(new FileSystemError(err));
                }
            });
        });
    }

    public writeFile(name: string, content: any): any {
        const path: string = this.constructPath(name);
        const dataToWrite = JSON.stringify(content);
        return new Promise((resolve, reject) => {
            fs.writeFile(path, dataToWrite, (err) => {
                if (!err) {
                    resolve(dataToWrite);
                } else {
                    reject(new FileSystemError(err));
                }
            });
        });
    }

    private constructPath(fileName: string): string {
        return this.fileSystemRoot + "/" + fileName;
    }

}