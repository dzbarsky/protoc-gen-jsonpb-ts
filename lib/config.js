"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var process = require("process");
var CONFIG_FILENAME = "protoc-gen-tsconfig.json";
var Options;
(function (Options) {
    function enumerate() {
        return ["config", "jsonFormat", "ignorePackage", "enumFormat"];
    }
    Options.enumerate = enumerate;
    function enumerateEnumFormat() {
        return ["stringLiteral", "enum"];
    }
    Options.enumerateEnumFormat = enumerateEnumFormat;
})(Options || (Options = {}));
var Config = (function () {
    function Config(options) {
        this.options = options;
    }
    Config.initWithCLIOptions = function (options) {
        return this.initWithOptions(parseCLIOptions(options));
    };
    Config.initWithOptions = function (options) {
        var jsonFormat = options.jsonFormat !== undefined
            ? options.jsonFormat
            : this.defaultOptions.jsonFormat;
        var ignorePackage = options.ignorePackage !== undefined
            ? options.ignorePackage
            : this.defaultOptions.ignorePackage;
        var enumFormat = options.enumFormat || this.defaultOptions.enumFormat;
        var config = options.config || this.defaultOptions.config;
        return this.initWithConfig({
            jsonFormat: jsonFormat,
            config: config,
            ignorePackage: ignorePackage,
            enumFormat: enumFormat
        });
    };
    Config.initWithConfig = function (options) {
        var config = Object.assign({}, options, loadConfig(options.config));
        var validation = validate(config);
        if (!validation.valid) {
            switch (validation.reason) {
                case "invalidOption":
                    throw new Error(validation.field + " is not valid option.");
                case "invalidValue":
                    throw new Error("The value of " + validation.field + " is invalid. value: " + validation.value);
            }
        }
        return new this(config);
    };
    Object.defineProperty(Config.prototype, "asObject", {
        get: function () {
            return this.options;
        },
        enumerable: true,
        configurable: true
    });
    Config.defaultOptions = {
        jsonFormat: true,
        config: path.join(process.cwd(), CONFIG_FILENAME),
        ignorePackage: false,
        enumFormat: "enum"
    };
    return Config;
}());
exports.Config = Config;
function loadConfig(config) {
    try {
        var configFile = fs.readFileSync(config, { encoding: "utf-8" });
        var options = JSON.parse(configFile);
        return options;
    }
    catch (error) {
        return {};
    }
}
function parseCLIOptions(options) {
    return options.split(",").reduce(function (res, v) {
        var _a;
        var split = v.split("=");
        return Object.assign(res, (_a = {}, _a[split[0]] = split[1], _a));
    }, {});
}
function validate(config) {
    var keys = Options.enumerate();
    var invalidOption = Object.keys(config).find(function (key) { return keys.indexOf(key) === -1; });
    if (invalidOption) {
        return { valid: false, field: invalidOption, reason: "invalidOption" };
    }
    if (config.enumFormat &&
        Options.enumerateEnumFormat().indexOf(config.enumFormat) === -1) {
        return {
            valid: false,
            field: "enumFormat",
            value: config.enumFormat,
            reason: "invalidValue"
        };
    }
    return { valid: true };
}
