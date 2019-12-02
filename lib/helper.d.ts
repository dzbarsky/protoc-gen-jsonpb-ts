import { FieldSchema, DependencySchema, HTTPRule } from "./types";
import { FieldDescriptorProto } from "google-protobuf/google/protobuf/descriptor_pb";
export declare abstract class Helper {
    isRepeated(field: FieldDescriptorProto.AsObject): boolean;
    isRequired(_field: FieldDescriptorProto.AsObject): boolean;
    abstract mapImports(dependencies: string[], filename: string): DependencySchema[];
    abstract mapHTTPOptions(http: HTTPRule): any;
    abstract mapFieldName(name: string): string;
    abstract mapFieldType(proto: FieldDescriptorProto.AsObject, filename: string): FieldSchema;
    abstract mapFieldTypeName(name: string, filename: string): FieldSchema;
}
