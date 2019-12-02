"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var well_known_proto_1 = require("./ts/well-known-proto");
function toArray(object) {
    return Object.keys(object).map(function (key) { return object[key]; });
}
exports.toArray = toArray;
function dependencyFilename(dependency, filename) {
    if (well_known_proto_1.wellKnownProto[dependency]) {
        return well_known_proto_1.wellKnownProto[dependency];
    }
    var path = relativePath(filename);
    return "" + path + dependency.replace(".proto", "_pb");
}
exports.dependencyFilename = dependencyFilename;
function dependencyName(dependency) {
    return dependency
        .replace(".proto", "")
        .replace(/\//g, "_")
        .replace(/\./g, "_")
        .replace(/\-/g, "_");
}
exports.dependencyName = dependencyName;
function snakeToCamel(str) {
    return str.replace(/(\_\w)/g, function (m) {
        return m[1].toUpperCase();
    });
}
exports.snakeToCamel = snakeToCamel;
function relativePath(filepath) {
    var depth = filepath.split("/").length;
    return depth === 1 ? "./" : new Array(depth).join("../");
}
exports.relativePath = relativePath;
function uppercaseFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.uppercaseFirst = uppercaseFirst;
function isProto2(descriptor) {
    var syntax = descriptor.getSyntax();
    return syntax === "" || syntax === "proto2";
}
exports.isProto2 = isProto2;
function read(stream) {
    if (stream === void 0) { stream = process.stdin; }
    var response = [];
    var size = 0;
    return new Promise(function (resolve, reject) {
        stream.on("readable", function () {
            var chunk;
            while ((chunk = stream.read())) {
                if (!(chunk instanceof Buffer))
                    throw new Error("Did not receive buffer");
                response.push(chunk);
                size += chunk.length;
            }
        });
        stream.on("error", function (error) {
            reject(error);
        });
        stream.on("end", function () {
            resolve(Buffer.concat(response, size));
        });
    });
}
exports.read = read;
