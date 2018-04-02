export function isAny(x: any): x is any {
    return typeof x !== "string";
}

export function isExtra(x: any): x is { [extra: string]: any } {
    return typeof x !== "boolean";
}

export function isString(x: any): x is string {
    return typeof x === "string";
}
