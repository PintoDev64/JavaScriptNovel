import { readFileSync } from "node:fs";
import { glob } from "node:fs/promises"
import CompilerTokenizer from "./src/modules/tokenizer/index.js";
import CompilerParser from "./src/modules/parser/index.js";
import CompilerLexer from "./src/modules/lexer/index.js";

export default async function NovelScriptCompiler(ScriptDirUrl: string) {
    const Specials: NLexer.INode[] = []
    const Variables: NLexer.INode[] = []
    const Scenes: NLexer.INode[] = []

    const NovelScriptFileLocations = glob(`${ScriptDirUrl}/**/*.njs`)

    for await (const fileDirectory of NovelScriptFileLocations) {
        const LenguageCompile = CompileFile(fileDirectory)

        const DefinedSpecials = GetSpecialVariables(LenguageCompile)
        Specials.push(...DefinedSpecials)

        const DefinedVars = GetGlobalVariables(LenguageCompile)
        Variables.push(...DefinedVars)

        const DefinedScenes = GetScenesDeclarations(LenguageCompile)
        Scenes.push(...DefinedScenes)
    }

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