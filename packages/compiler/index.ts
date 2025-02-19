import "./src/index.d.ts"

import { glob, readFileSync } from "node:fs";
import CompilerTokenizer from "./src/modules/tokenizer/index.js";
import CompilerParser from "./src/modules/parser/index.js";
import CompilerLexer from "./src/modules/lexer/index.js";

export default function NovelScriptCompiler(ScriptDirUrl: string) {
    let NovelScriptFileLocations: string[] = []
    glob(`${ScriptDirUrl}/**/*.njs`, (err, files) => {
        if (err) return console.log(err);
        NovelScriptFileLocations = files
    })

    const Specials: NLexer.INode[] = []
    const Variables: NLexer.INode[] = []
    const Scenes: NLexer.INode[] = []

    NovelScriptFileLocations.forEach((fileDirectory, _) => {
        const LenguageCompile = CompileFile(fileDirectory)

        const DefinedSpecials = GetSpecialVariables(LenguageCompile)
        Specials.push(...DefinedSpecials)

        const DefinedVars = GetGlobalVariables(LenguageCompile)
        Variables.push(...DefinedVars)

        const DefinedScenes = GetScenesDeclarations(LenguageCompile)
        Scenes.push(...DefinedScenes)
    })

    return {
        Variables,
        Specials,
        Scenes
    }
}

function CompileFile(fileDirectory: string) {
    const FileContent = readFileSync(fileDirectory, { encoding: 'utf-8' });
    const LenguageTokens = CompilerTokenizer(FileContent, fileDirectory)
    const LenguageParsed = CompilerParser(LenguageTokens.tokens, LenguageTokens.file)
    return CompilerLexer(LenguageParsed)
}

function GetGlobalVariables(fileContext: NLexer.INodeEntry) {
    const FileBodyContent = fileContext.body
    const GlobalVars = FileBodyContent.filter((Node, _) =>
        Node.type === "VariableDeclaration"
    )
    return GlobalVars
}

function GetScenesDeclarations(fileContext: NLexer.INodeEntry) {
    const FileBodyContent = fileContext.body
    const GlobalVars = FileBodyContent.filter((Node, _) =>
        Node.type === "FunctionDeclaration" && Node.name === "Scene"
    )
    return GlobalVars
}

function GetSpecialVariables(fileContext: NLexer.INodeEntry) {
    const FileBodyContent = fileContext.body
    const SpecialVars = FileBodyContent.filter((Node, _) =>
        Node.type === "ImageDeclaration" ||
        Node.type === "AudioDeclaration" ||
        Node.type === "CharacterDeclaration"
    )
    return SpecialVars
}