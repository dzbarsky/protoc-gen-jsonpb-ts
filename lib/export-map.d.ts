import { FileDescriptorProto } from "google-protobuf/google/protobuf/descriptor_pb";
interface Definition {
    typeName: string;
    filename: string;
    packageName: string;
}
export declare class ExportMap {
    definitionMap: Record<string, Definition>;
    protoMap: Record<string, FileDescriptorProto>;
    fieldMap: Record<string, string[]>;
    getDefinition(typeName: string): Definition;
    getProto(filename: string): FileDescriptorProto;
    addProto(proto: FileDescriptorProto): void;
    hasDependency(filename: string, dependency: string): boolean;
    getDependencies(filename: string, dependency: string): Definition[];
    private readService;
    private readMessage;
    private readEnum;
}
export {};
