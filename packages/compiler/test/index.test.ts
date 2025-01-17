import { readFileSync, writeFileSync } from "node:fs";
import { describe, it } from "node:test";

// Methods
import Tokenizer from "../src/tokenizer.js";
import Parser from "../src/parser";
import { ConsoleColors } from "../src/utils/index.js";

// Tests
describe("Unit Methods Test", {}, () => {
    it("Tokenizer: return a token list with type {NTokenizer.IToken}", async () => {
        console.log(`${ConsoleColors.cyan("Tokenizer ↘")}`);
        
        // Files Constants
        const scriptContent = readFileSync("files/test.tokenizer.njs", {
            encoding: "utf-8"
        });

        const tokenList = await Tokenizer(scriptContent);
        console.log(`${ConsoleColors.cyan("Tokenizer Result:")}\n`, tokenList);
        writeFileSync("files/test.parser.json", JSON.stringify(tokenList, null, 4))
    });

    it("Parser: return content with type {NParser.IToken}", async () => {
        console.log(`${ConsoleColors.cyan("Parser ↘")}`);
        
        // Files Constants
        const scriptContent = readFileSync("files/test.parser.json", {
            encoding: "utf-8"
        });

        const parsedList = await Parser(JSON.parse(scriptContent));
        console.log(`${ConsoleColors.cyan("Parser Result:")}\n`, parsedList);
    });
});