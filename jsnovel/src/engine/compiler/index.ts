import type { NParser } from "../ports/compiler";

// Native Modules
import { readFileSync } from "node:fs";
import { glob } from "node:fs/promises"

import compilerTokenizer from "./modules/tokenizer/index.js";
import compilerParser from "./modules/parser/index.js";
import compilerLexer from "./modules/lexer/index.js";

export default async function novelScriptCompiler(ScriptDirUrl: string) {
    let Specials: NParser.INode[] = []
    let Variables: NParser.INode[] = []
    let Scenes: NParser.INode[] = []

    const NovelScriptFileLocations = glob(`${ScriptDirUrl}/**/*.njs`)

    for await (const fileDirectory of NovelScriptFileLocations) {
        const LenguageCompile = compileFile(fileDirectory)

        const DefinedSpecials = GetSpecialVariables(LenguageCompile)
        Specials = DefinedSpecials

        const DefinedVars = GetGlobalVariables(LenguageCompile)
        Variables = DefinedVars

        const DefinedScenes = GetScenesDeclarations(LenguageCompile)
        Scenes = DefinedScenes
    }

    let CompiledScripts = [
        ...Variables,
        ...Specials,
        ...Scenes
    ]

    console.log(CompiledScripts);

    return CompiledScripts
}

function compileFile(fileDirectory: string) {
    const scriptContent = readFileSync(fileDirectory, { encoding: 'utf-8' });
    const lenguageTokens = compilerTokenizer(scriptContent, fileDirectory)
    const lenguageParsed = compilerParser(lenguageTokens.tokens, lenguageTokens.file)
    return compilerLexer(lenguageParsed)
}

function GetGlobalVariables(fileContext: NParser.INodeEntry) {
    const FileBodyContent = fileContext.body
    const GlobalVars = FileBodyContent.filter((Node, _) =>
        Node.type === "VariableDeclaration"
    )
    return GlobalVars
}

function GetScenesDeclarations(fileContext: NParser.INodeEntry) {
    const FileBodyContent = fileContext.body
    const GlobalVars = FileBodyContent.filter((Node, _) =>
        Node.type === "FunctionDeclaration" && Node.name === "Scene"
    )
    return GlobalVars
}

function GetSpecialVariables(fileContext: NParser.INodeEntry) {
    const FileBodyContent = fileContext.body
    const SpecialVars = FileBodyContent.filter((Node, _) =>
        Node.type === "ImageDeclaration" ||
        Node.type === "AudioDeclaration" ||
        Node.type === "CharacterDeclaration"
    )
    return SpecialVars
}