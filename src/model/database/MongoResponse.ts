import IDatabaseResponse from "../interfaces/IDatabaseResponse";

export default class MongoResponse implements IDatabaseResponse {

    // TODO: revisit the appropriate datatype we should use for the wrapped Data
    private wrappedRaw: any;

    constructor(rawResponse: any) {
        // TODO
    }

    public getContent(): any {
        // TODO
    }

}