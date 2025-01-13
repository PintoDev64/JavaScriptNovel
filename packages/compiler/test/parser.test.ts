import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import Parser from "../src/parser";

// Files Constants
const scriptContent = readFileSync("files/test.parser.json", {
    encoding: "utf-8"
});

describe("Parser", {},() => {
    it("should return a parsed token list {NParser.IToken type}", async () => {
        const parsedList = await Parser(JSON.parse(scriptContent));
        console.log("Parser Result:\n",parsedList);
    });
});