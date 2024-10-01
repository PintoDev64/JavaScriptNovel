import { readFileSync } from "fs";

// Utils
import { CheckPerformance, SearchFiles } from "./utils";

// Program
import Tokenizer from "./tokenizer";

// Constants
const FOLDER_DIRECTORY = "test"
const FILE_EXTENSION = ".jsnovel"

const LocatedFiles = SearchFiles(FOLDER_DIRECTORY, FILE_EXTENSION)

/**
 * Motor de compilacion del lenguaje .jsnovel
 */
function LenguageCompiler(FileLocation: string) {
    const FileContent = readFileSync(FileLocation, { encoding: 'utf-8' });

    const result = Tokenizer(FileContent)
    console.log(result);
}

for (const FileLocation of LocatedFiles) {
    CheckPerformance(() => {
        LenguageCompiler(FileLocation)
    })
}