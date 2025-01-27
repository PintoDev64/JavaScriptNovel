import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

// Methods
import { ConsoleColors } from "../src/utils/index.js";
import CompilerTokenizer from "../src/modules/tokenizer/index.js";

// Tests
describe("Unit Methods Test", () => {
    it("Tokenizer: return a token list with type {NTokenizer.IToken}", { timeout: 10000 }, async () => {
        // TODO: Add a test for the tokenizer
        const FileContent = readFileSync("files/test.tokenizer.njs", { encoding: 'utf-8' });
        const result = CompilerTokenizer(FileContent)
        console.log(`${ConsoleColors.cyan("Tokenizer ↘")}`);
        console.log(result);
    });

    it("Parser: return content with type {NParser.IToken}", { todo: true }, async () => {
        // TODO: Add a test for the parser
        console.log(`${ConsoleColors.cyan("Parser ↘")}`);

    });

    it("Director: return a array functions", { todo: true }, () => {
        // TODO: Add a test for the director
        console.log(`${ConsoleColors.cyan("Director ↘")}`);
    });
});