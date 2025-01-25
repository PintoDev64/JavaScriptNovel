import { readFileSync, writeFileSync } from "node:fs";
import { describe, it } from "node:test";

// Methods
import CompilerTokenizer from "../src/modules/tokenizer/index.js";
import CompilerParser from "../src/modules/parser/index.js";
import { ConsoleColors } from "../src/utils/index.js";

// Tests
describe("Unit Methods Test", () => {
    it("Tokenizer: return a token list with type {NTokenizer.IToken}", { timeout: 10000 }, async () => {
        console.log(`${ConsoleColors.cyan("Tokenizer ↘")}`);
        
        // Files Constants
        const scriptContent = readFileSync("files/test.tokenizer.njs", {
            encoding: "utf-8"
        });

        const tokenList = await CompilerTokenizer(scriptContent);
        console.log(`${ConsoleColors.cyan("Tokenizer Result:")}\n`, tokenList);
        writeFileSync("files/test.parser.json", JSON.stringify(tokenList, null, 4))
    });
    
    it("Parser: return content with type {NParser.IToken}", async () => {
        console.log(`${ConsoleColors.cyan("Parser ↘")}`);
        
        // Files Constants
        const scriptContent = readFileSync("files/test.parser.json", {
            encoding: "utf-8"
        });
        
        const parsedList = await CompilerParser(JSON.parse(scriptContent));
        console.log(`${ConsoleColors.cyan("Parser Result:")}\n`, parsedList);
        writeFileSync("files/test.director.json", JSON.stringify(parsedList, null, 4))
    });

    it("Director: return a array functions", { todo: true }, () => {
        console.log(`${ConsoleColors.cyan("Director ↘")}`);
    });
});