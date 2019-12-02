"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var ExportMap = (function () {
    function ExportMap() {
        this.definitionMap = {};
        this.protoMap = {};
        this.fieldMap = {};
    }
    ExportMap.prototype.getDefinition = function (typeName) {
        return this.definitionMap[typeName];
    };
    ExportMap.prototype.getProto = function (filename) {
        return this.protoMap[filename];
    };
    ExportMap.prototype.addProto = function (proto) {
        var _this = this;
        this.protoMap[proto.getName()] = proto;
        proto.getServiceList().forEach(function (service) {
            _this.readService(service, proto);
        });
        proto.getEnumTypeList().forEach(function (enumType) {
            _this.readEnum(enumType, proto, proto.getPackage());
        });
        proto.getMessageTypeList().forEach(function (message) {
            _this.readMessage(message, proto, proto.getPackage());
        });
    };
    ExportMap.prototype.hasDependency = function (filename, dependency) {
        return this.getDependencies(filename, dependency).length > 0;
    };
    ExportMap.prototype.getDependencies = function (filename, dependency) {
        var fields = this.fieldMap[filename];
        if (!fields) {
            return [];
        }
        var fieldTypeNames = fields;
        return utils_1.toArray(this.definitionMap).filter(function (definition) {
            return definition.filename === dependency &&
                fieldTypeNames.indexOf(definition.typeName) !== -1;
        });
    };
    ExportMap.prototype.readService = function (service, proto) {
        var _this = this;
        var filename = proto.getName();
        if (this.fieldMap[filename] === undefined) {
            this.fieldMap[filename] = [];
        }
        service.getMethodList().forEach(function (method) {
            _this.fieldMap[filename].push(method.getInputType().slice(1));
            _this.fieldMap[filename].push(method.getOutputType().slice(1));
        });
    };
    ExportMap.prototype.readMessage = function (message, proto, scope) {
        var _this = this;
        var filename = proto.getName();
        var packageName = proto.getPackage();
        var prefix = scope ? scope + "." : "";
        var name = "" + prefix + message.getName();
        if (this.fieldMap[filename] === undefined) {
            this.fieldMap[filename] = [];
        }
        this.definitionMap[name] = {
            typeName: name,
            filename: filename,
            packageName: packageName
        };
        message.getFieldList().forEach(function (field) {
            _this.fieldMap[filename].push(field.getTypeName().slice(1));
        });
        message.getEnumTypeList().forEach(function (enumType) {
            _this.readEnum(enumType, proto, name);
        });
        message.getNestedTypeList().forEach(function (message) {
            _this.readMessage(message, proto, name);
        });
    };
    ExportMap.prototype.readEnum = function (enumType, proto, scope) {
        var filename = proto.getName();
        var packageName = proto.getPackage();
        var prefix = scope ? scope + "." : "";
        var name = "" + prefix + enumType.getName();
        this.definitionMap[name] = {
            typeName: name,
            filename: filename,
            packageName: packageName
        };
    };
    return ExportMap;
}());
exports.ExportMap = ExportMap;
