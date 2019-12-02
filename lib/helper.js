"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var descriptor_pb_1 = require("google-protobuf/google/protobuf/descriptor_pb");
var Helper = (function () {
    function Helper() {
    }
    Helper.prototype.isRepeated = function (field) {
        return descriptor_pb_1.FieldDescriptorProto.Label.LABEL_REPEATED === field.label;
    };
    Helper.prototype.isRequired = function (_field) {
        return true;
    };
    return Helper;
}());
exports.Helper = Helper;
