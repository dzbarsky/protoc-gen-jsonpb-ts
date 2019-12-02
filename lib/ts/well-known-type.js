"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wktMap = {
    ".google.protobuf.Timestamp": {
        type: "string",
        format: "date-time"
    },
    ".google.protobuf.Empty": {
        type: "{}"
    },
    ".google.protobuf.Duration": {
        type: "string"
    },
    ".google.protobuf.Any": {
        type: "any"
    },
    ".google.protobuf.FieldMask": {
        type: "string"
    },
    ".google.protobuf.Struct": {
        type: "Record<string, any>"
    },
    ".google.protobuf.StringValue": {
        type: "string"
    },
    ".google.protobuf.BytesValue": {
        type: "string",
        format: "byte"
    },
    ".google.protobuf.Int32Value": {
        type: "number",
        format: "int32"
    },
    ".google.protobuf.UInt32Value": {
        type: "number",
        format: "int32"
    },
    ".google.protobuf.Int64Value": {
        type: "string",
        format: "int64"
    },
    ".google.protobuf.UInt64Value": {
        type: "string",
        format: "uint64"
    },
    ".google.protobuf.FloatValue": {
        type: "number",
        format: "float"
    },
    ".google.protobuf.DoubleValue": {
        type: "number",
        format: "double"
    },
    ".google.protobuf.BoolValue": {
        type: "boolean",
        format: "boolean"
    }
};
function isWellKnown(typeName) {
    return exports.wktMap[typeName] !== undefined;
}
exports.isWellKnown = isWellKnown;
function wellKnownType(typeName) {
    return exports.wktMap[typeName];
}
exports.wellKnownType = wellKnownType;
