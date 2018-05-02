import { MSICreator } from "electron-wix-msi";
import * as path from "path";


// Step 1: Instantiate the MSICreator
const msiCreator = new MSICreator({
    appDirectory: path.join(__dirname, "temp/corkycherry-win32-x64"),
    description: "wjt's application",
    exe: "corkycherry",
    name: "corkycherry",
    manufacturer: "wjt Inc.",
    version: "0.1",
    outputDirectory: path.join(__dirname, "release/corkycherry-win32-x64"),
});

async function buildmsi() {
    try {
        // Step 2: Create a .wxs template file
        await msiCreator.create();
        // Step 3: Compile the template to a .msi file
        await msiCreator.compile();
    } catch (error) {
        console.log(error);
    }
}

buildmsi();
