import Hashids from "hashids";

const hashids = new Hashids("cherry", 16, "abcdefghijklmnopqrstuvwxyz");


class Generator {
    public createId(str: string) {
        return hashids.encodeHex(str);
    }
}

export const generator = new Generator();
