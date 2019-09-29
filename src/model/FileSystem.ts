export default class FileSystem {

    private fileSystemRoot: string;

    constructor(rootPath: string) {
        this.fileSystemRoot = rootPath;
    }

    public getRoot(): string {
        return this.fileSystemRoot;
    }

    public setRoot(newRoot: string): string {
        this.fileSystemRoot = newRoot;
        return this.fileSystemRoot;
    }

    public async readFile(name: string): Promise<any> {
        return Promise.reject("IGNORE THIS")
    }

    public async writeFile(name: string, content: any): Promise<string> {
        return Promise.reject("IGNORE THIS")
    }

    public static deleteFile(name: string, rootDir: string): Promise<boolean>  {
        return Promise.reject("IGNORE THIS")
    }

    private constructPath(fileName: string): string {
        return this.fileSystemRoot + "/" + fileName;
    }

}
