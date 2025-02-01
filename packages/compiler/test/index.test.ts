import { readFileSync, writeFileSync } from "node:fs";
import { describe, it } from "node:test";

// Methods
import { ConsoleColors } from "../src/utils/index.js";
import CompilerTokenizer from "../src/modules/tokenizer/index.js";
import CompilerParser from "../src/modules/parser/index.js";

// Tests
describe("Unit Methods Test", () => {
    it("Tokenizer: return a token list with type {NTokenizer.IToken}", { timeout: 10000 }, async () => {
        console.log(`${ConsoleColors.cyan("Tokenizer ↘")}`);
        const FileContent = readFileSync("files/test.tokenizer.njs", { encoding: 'utf-8' });
        const result = CompilerTokenizer(FileContent)
        console.log(result);
        const resultConvert = JSON.stringify(result, null, 4)
        writeFileSync("files/test.parser.json", resultConvert, { encoding: 'utf-8' })
    });

    it("Parser: return content with type {NParser.IToken}", { todo: true }, async () => {
        console.log(`${ConsoleColors.cyan("Parser ↘")}`);
        const FileContent = readFileSync("files/test.parser.json", { encoding: 'utf-8' });
        const FileContentToJSON = JSON.parse(FileContent)
        const result = CompilerParser(FileContentToJSON)
        console.log(result);
        const resultConvert = JSON.stringify(result, null, 4)
        writeFileSync("files/test.instructor.json", resultConvert, { encoding: 'utf-8' })
    });

    it("Director: return a array functions", { todo: true }, () => {
        // TODO: Add a test for the director
        console.log(`${ConsoleColors.cyan("Director ↘")}`);
    });
});