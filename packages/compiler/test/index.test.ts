import type { NTokenizer, NParser } from "../src/types.js";

import { readFileSync, writeFileSync } from "node:fs";
import { describe, it } from "node:test";

// Methods
import { ConsoleColors } from "../src/utils/index.js";
import CompilerTokenizer from "../src/modules/tokenizer/index.js";
import CompilerParser from "../src/modules/parser/index.js";
import CompilerLexer from "../src/modules/lexer/index.js";
import NovelScriptCompiler from "../src/index.js"


// Tests
describe("Describe results step by step of the compiler",() => {
    it("Tokenizer: return a token list with type {NTokenizer.IToken}", { timeout: 10000 }, async () => {
        console.log(`${ConsoleColors.cyan("Tokenizer ↘")}`);
        const FileContent = readFileSync("files/test.tokenizer.njs", { encoding: 'utf-8' });
        const result = CompilerTokenizer(FileContent, "files/test.tokenizer.njs")
        console.log(result);
        const resultConvert = JSON.stringify(result, null, 4)
        writeFileSync("files/test.parser.json", resultConvert, { encoding: 'utf-8' })
    });

    it("Parser: return content with type {NParser.IToken}", { timeout: 5000 }, async () => {
        console.log(`${ConsoleColors.cyan("Parser ↘")}`);
        const FileContent = readFileSync("files/test.parser.json", { encoding: 'utf-8' });
        const FileContentToJSON: NTokenizer.ITokenEntry = JSON.parse(FileContent)
        const result = CompilerParser(FileContentToJSON.tokens, FileContentToJSON.file)
        console.log(result);
        const resultConvert = JSON.stringify(result, null, 4)
        writeFileSync("files/test.lexer.json", resultConvert, { encoding: 'utf-8' })
    });

    it("Lexer: returns the same AST array validating its structure with type {NParser.IToken}", { timeout: 5000 }, () => {
        console.log(`${ConsoleColors.cyan("Lexer ↘")}`);
        const FileContent = readFileSync("files/test.lexer.json", { encoding: 'utf-8' });
        const FileContentToJSON: NParser.INodeEntry = JSON.parse(FileContent)
        const result = CompilerLexer(FileContentToJSON)
        console.log(result);
    });
});

describe("Exported Library Function", { skip: true , todo: true }, () => {
    it("Try", async () => {
        console.log(`${ConsoleColors.magenta("Exported Compiler ↘")}`);
        const result = await NovelScriptCompiler("files")
        console.log("Library: ",result);
        const resultConvert = JSON.stringify(result, null, 4)
        writeFileSync("files/test.compiler.json", resultConvert, { encoding: 'utf-8' })
    })
})