"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var descriptor_pb_1 = require("google-protobuf/google/protobuf/descriptor_pb");
var well_known_type_1 = require("./well-known-type");
var primitive_type_1 = require("./primitive-type");
var helper_1 = require("../helper");
var well_known_proto_1 = require("../ts/well-known-proto");
var utils_1 = require("../utils");
var TSHelper = (function (_super) {
    __extends(TSHelper, _super);
    function TSHelper(config, map) {
        var _this = _super.call(this) || this;
        _this.map = map;
        _this.config = config.asObject;
        return _this;
    }
    TSHelper.prototype.mapImports = function (dependencies, filename) {
        var _this = this;
        return dependencies
            .filter(function (dep) {
            return (_this.filterDependencies(dep) && _this.map.hasDependency(filename, dep));
        })
            .map(function (dep) { return _this.dependency(dep, filename); });
    };
    TSHelper.prototype.mapHTTPOptions = function (http) {
        return ["post", "put", "get", "pb_delete", "patch"].reduce(function (acc, method) {
            if (http[method]) {
                return {
                    method: method,
                    path: http[method]
                };
            }
            return acc;
        }, {});
    };
    TSHelper.prototype.mapFieldName = function (name) {
        return utils_1.snakeToCamel(name);
    };
    TSHelper.prototype.mapFieldType = function (proto, filename) {
        if (proto.type === descriptor_pb_1.FieldDescriptorProto.Type.TYPE_ENUM ||
            proto.type === descriptor_pb_1.FieldDescriptorProto.Type.TYPE_MESSAGE) {
            return this.mapFieldTypeName(proto.typeName, filename);
        }
        return primitive_type_1.primitiveType(proto);
    };
    TSHelper.prototype.mapFieldTypeName = function (fullTypeName, filename) {
        if (well_known_type_1.isWellKnown(fullTypeName) && this.config.jsonFormat) {
            return well_known_type_1.wellKnownType(fullTypeName);
        }
        fullTypeName = fullTypeName.slice(1);
        var definition = this.map.getDefinition(fullTypeName);
        var typeName = this.typeName(fullTypeName, definition.packageName);
        if (filename === definition.filename) {
            return {
                type: typeName
            };
        }
        if (this.config.ignorePackage) {
            return {
                type: utils_1.dependencyName(definition.filename) + "." + typeName
            };
        }
        return {
            type: utils_1.dependencyName(definition.filename) + "." + fullTypeName
        };
    };
    TSHelper.prototype.filterDependencies = function (dependency) {
        if (this.config.jsonFormat) {
            return (well_known_proto_1.ignoreProto.indexOf(dependency) === -1 && !well_known_proto_1.wellKnownProto[dependency]);
        }
        return well_known_proto_1.ignoreProto.indexOf(dependency) === -1;
    };
    TSHelper.prototype.typeName = function (fullTypeName, packageName) {
        if (packageName.length === 0) {
            return fullTypeName;
        }
        return fullTypeName.slice(packageName.length + 1);
    };
    TSHelper.prototype.dependency = function (dependency, filename) {
        return {
            name: utils_1.dependencyName(dependency),
            filename: utils_1.dependencyFilename(dependency, filename)
        };
    };
    return TSHelper;
}(helper_1.Helper));
exports.TSHelper = TSHelper;
