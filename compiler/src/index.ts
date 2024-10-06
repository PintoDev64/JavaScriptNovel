import { readFileSync, writeFileSync } from "fs";

// Utils
import { CheckPerformance, SearchFiles } from "./utils";

// Program
import Tokenizer from "./tokenizer";
import Parser from "./parser";
import Transformer from "./transformer";

// Constants
const FOLDER_DIRECTORY = "test"
const FILE_EXTENSION = ".njs"

const LocatedFiles = SearchFiles(FOLDER_DIRECTORY, FILE_EXTENSION)

/**
 * Motor de compilacion del lenguaje .jsnovel
 */
function LenguageCompiler(FileLocation: string) {
    const FileContent = readFileSync(FileLocation, { encoding: 'utf-8' });

    const tokenResult = Tokenizer(FileContent)
    console.log("Tokenizer Result", tokenResult);

    const astResult = Parser(tokenResult)
    console.log("Parser Result", astResult);

    console.log("\n");

    const AstConvert = Transformer(astResult)
    console.log("Transform Result", AstConvert);

    writeFileSync("result.json", JSON.stringify(AstConvert, null, 4), { encoding: "utf-8" })
}

for (const FileLocation of LocatedFiles) {
    CheckPerformance(() => {
        LenguageCompiler(FileLocation)
    })
}