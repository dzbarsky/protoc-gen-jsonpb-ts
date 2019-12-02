import { FieldDescriptorProto } from "google-protobuf/google/protobuf/descriptor_pb";
import { FieldSchema, HTTPRule } from "../types";
import { Helper } from "../helper";
import { Config } from "../config";
import { ExportMap } from "../export-map";
import { HTTPMethod } from "../lib";
export declare class TSHelper extends Helper {
    private map;
    config: Config.AsObject;
    constructor(config: Config, map: ExportMap);
    mapImports(dependencies: string[], filename: string): {
        name: string;
        filename: string;
    }[];
    mapHTTPOptions(http: HTTPRule): {
        method: HTTPMethod;
        path: string;
    };
    mapFieldName(name: string): string;
    mapFieldType(proto: FieldDescriptorProto.AsObject, filename: string): FieldSchema;
    mapFieldTypeName(fullTypeName: string, filename: string): FieldSchema;
    private filterDependencies;
    private typeName;
    private dependency;
}
