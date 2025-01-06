import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

// Methods
import Tokenizer from "../src/tokenizer.js";

// Files Constants
const scriptContent = readFileSync("files/test.tokenizer.njs", {
    encoding: "utf-8"
});

// Tests
describe("Tokenizer", {},() => {
    it("should return a token list {NTokenizer.IToken type}", async () => {
        const tokenList = await Tokenizer(scriptContent);
        console.log("Tokenizer Result:\n",tokenList);
    });
});