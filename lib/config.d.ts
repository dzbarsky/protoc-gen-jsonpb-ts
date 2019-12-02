interface Options {
    config: string;
    jsonFormat: boolean;
    ignorePackage: boolean;
    enumFormat: "stringLiteral" | "enum";
}
declare namespace Options {
    function enumerate(): (keyof Options)[];
    function enumerateEnumFormat(): Options["enumFormat"][];
}
export declare class Config {
    options: Options;
    static defaultOptions: Options;
    static initWithCLIOptions(options: string): Config;
    static initWithOptions(options: Partial<Options>): Config;
    static initWithConfig(options: Options): Config;
    constructor(options: Options);
    get asObject(): Options;
}
export declare namespace Config {
    type AsObject = Options;
}
export {};
