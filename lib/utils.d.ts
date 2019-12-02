/// <reference types="node" />
import { FileDescriptorProto } from "google-protobuf/google/protobuf/descriptor_pb";
export declare function toArray<T>(object: Record<string, T>): T[];
export declare function dependencyFilename(dependency: string, filename: string): string;
export declare function dependencyName(dependency: string): string;
export declare function snakeToCamel(str: string): string;
export declare function relativePath(filepath: string): string;
export declare function uppercaseFirst(str: string): string;
export declare function isProto2(descriptor: FileDescriptorProto): boolean;
export declare function read(stream?: NodeJS.ReadStream): Promise<Buffer>;
