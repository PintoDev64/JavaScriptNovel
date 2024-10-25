"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
// Utils
const utils_1 = require("./utils");
// Program
const tokenizer_1 = __importDefault(require("./tokenizer"));
const parser_1 = __importDefault(require("./parser"));
const transformer_1 = __importDefault(require("./transformer"));
// Constants
const FOLDER_DIRECTORY = "test";
const FILE_EXTENSION = ".njs";
const LocatedFiles = (0, utils_1.SearchFiles)(FOLDER_DIRECTORY, FILE_EXTENSION);
/**
 * Motor de compilacion del lenguaje .jsnovel
 */
function LenguageCompiler(FileLocation) {
    const FileContent = (0, fs_1.readFileSync)(FileLocation, { encoding: 'utf-8' });
    const tokenResult = (0, tokenizer_1.default)(FileContent);
    console.log("Tokenizer Result", tokenResult);
    const astResult = (0, parser_1.default)(tokenResult);
    console.log("Parser Result", astResult);
    console.log("\n");
    const AstConvert = (0, transformer_1.default)(astResult);
    console.log("Transform Result", AstConvert);
    (0, fs_1.writeFileSync)("result.json", JSON.stringify(AstConvert, null, 4), { encoding: "utf-8" });
}
for (const FileLocation of LocatedFiles) {
    (0, utils_1.CheckPerformance)(() => {
        LenguageCompiler(FileLocation);
    });
}
