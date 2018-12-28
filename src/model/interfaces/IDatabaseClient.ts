export class DatabaseConnectionError extends Error {
    constructor(...args: any[]) {
        super(...args);
    }
}

export class DatabaseWriteError extends Error {
    constructor(...args: any[]) {
        super(...args);
    }
}

export class DatabaseQueryError extends Error {
    constructor(...args: any[]) {
        super(...args);
    }
}

export default interface IDatabaseClient {

    /**
     * Opens a connection to a database service
     *
     * @return any
     *
     * Upon success, it should return a non-null reference to the connection object.
     * If a failure occurs, it should throw an error
     */
    openConnection(url?: string): Promise<any>;

    /**
     * Closes a connection to a database service
     *
     * @return any
     *
     * Upon success, it should return true.
     * If a failure occurs, it should throw an error
     */
    closeConnection(): Promise<boolean>;
}