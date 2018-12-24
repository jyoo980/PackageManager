export default class Log {

    public static trace(msg: string): void {
        console.trace(`<T> ${this.getLogTime()}: ${msg}`);
    }

    public static info(msg: string): void {
        console.info(`<I> ${this.getLogTime()}: ${msg}`);
    }

    public static warn(msg: string): void {
        console.warn(`<W> ${this.getLogTime()}: ${msg}`);
    }

    public static test(msg: string): void {
        console.log(`<T> ${this.getLogTime()}: ${msg}`);
    }

    private static getLogTime(): string {
        return new Date().toLocaleString();
    }
}