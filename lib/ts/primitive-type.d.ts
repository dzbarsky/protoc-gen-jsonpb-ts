import { FieldSchema } from "../types";
import { FieldDescriptorProto } from "google-protobuf/google/protobuf/descriptor_pb";
export declare function primitiveType(field: FieldDescriptorProto.AsObject): FieldSchema;
