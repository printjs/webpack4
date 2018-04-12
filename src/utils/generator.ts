import jsSHA from "jssha";



class Generator {
    public createId(str: string) {
        const shaObj = new jsSHA("SHA-512", "TEXT");
        shaObj.update(str);
        return shaObj.getHash("HEX").substring(0, 16);
    }
}

export const generator = new Generator();
