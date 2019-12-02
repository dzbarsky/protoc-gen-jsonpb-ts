"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var descriptor_pb_1 = require("google-protobuf/google/protobuf/descriptor_pb");
function primitiveType(field) {
    var type = field.type;
    switch (type) {
        case descriptor_pb_1.FieldDescriptorProto.Type.TYPE_DOUBLE:
            return {
                type: "number",
                format: "double"
            };
        case descriptor_pb_1.FieldDescriptorProto.Type.TYPE_FLOAT:
            return {
                type: "number",
                format: "float"
            };
        case descriptor_pb_1.FieldDescriptorProto.Type.TYPE_INT64:
            return {
                type: "string",
                format: "int64"
            };
        case descriptor_pb_1.FieldDescriptorProto.Type.TYPE_UINT64:
            return {
                type: "string",
                format: "uint64"
            };
        case descriptor_pb_1.FieldDescriptorProto.Type.TYPE_SINT64:
            return {
                type: "string",
                format: "int64"
            };
        case descriptor_pb_1.FieldDescriptorProto.Type.TYPE_FIXED64:
            return {
                type: "string",
                format: "int64"
            };
        case descriptor_pb_1.FieldDescriptorProto.Type.TYPE_SFIXED64:
            return {
                type: "string",
                format: "int64"
            };
        case descriptor_pb_1.FieldDescriptorProto.Type.TYPE_INT32:
            return {
                type: "number",
                format: "int32"
            };
        case descriptor_pb_1.FieldDescriptorProto.Type.TYPE_UINT32:
            return {
                type: "number",
                format: "int32"
            };
        case descriptor_pb_1.FieldDescriptorProto.Type.TYPE_SINT32:
            return {
                type: "number",
                format: "int32"
            };
        case descriptor_pb_1.FieldDescriptorProto.Type.TYPE_FIXED32:
            return {
                type: "number",
                format: "int32"
            };
        case descriptor_pb_1.FieldDescriptorProto.Type.TYPE_SFIXED32:
            return {
                type: "number",
                format: "int32"
            };
        case descriptor_pb_1.FieldDescriptorProto.Type.TYPE_BOOL:
            return {
                type: "boolean",
                format: "boolean"
            };
        case descriptor_pb_1.FieldDescriptorProto.Type.TYPE_STRING:
            return {
                type: "string",
                format: "string"
            };
        case descriptor_pb_1.FieldDescriptorProto.Type.TYPE_BYTES:
            return {
                type: "string",
                format: "byte"
            };
        default:
            return {
                type: "any"
            };
    }
}
exports.primitiveType = primitiveType;
