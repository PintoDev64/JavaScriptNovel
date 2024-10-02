import { readFileSync } from "fs";

// Utils
import { CheckPerformance, SearchFiles } from "./utils";

// Program
import Tokenizer from "./tokenizer";
import Parser from "./parser";

// Constants
const FOLDER_DIRECTORY = "test"
const FILE_EXTENSION = ".jsnovel"

const LocatedFiles = SearchFiles(FOLDER_DIRECTORY, FILE_EXTENSION)

/**
 * Motor de compilacion del lenguaje .jsnovel
 */
function LenguageCompiler(FileLocation: string) {
    const FileContent = readFileSync(FileLocation, { encoding: 'utf-8' });

    const tokenResult = Tokenizer(FileContent)
    /* console.log("Tokenizer Result",tokenResult); */

    /* console.log("\n"); */
    
    const astResult = Parser(tokenResult)
    /* console.log("Parser Result", astResult); */
}

for (const FileLocation of LocatedFiles) {
    CheckPerformance(() => {
        LenguageCompiler(FileLocation)
    })
}