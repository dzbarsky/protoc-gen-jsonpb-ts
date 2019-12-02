import { FieldSchema } from "../types";
export declare const wktMap: Record<string, FieldSchema>;
export declare function isWellKnown(typeName: string): boolean;
export declare function wellKnownType(typeName: string): FieldSchema;
