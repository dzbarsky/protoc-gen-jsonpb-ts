export interface FieldSchema {
    type: string;
    format?: string;
}
export interface DependencySchema {
    name: string;
    filename: string;
}
export interface HTTPRule {
    selector: string;
    get: string;
    put: string;
    post: string;
    pb_delete: string;
    patch: string;
    body: "*" | string;
    custom: CustomHTTPPattern;
    additionalBindingsList: HTTPRule[];
}
interface CustomHTTPPattern {
    kind: string;
    path: string;
}
export {};
