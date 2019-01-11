export default interface IDatabaseResponse {


    /**
     * @return any
     *
     * Returns the wrapped response from the database. Usually in JSON form
     *
     */
    getContent(): any;

}