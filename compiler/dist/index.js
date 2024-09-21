"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const tokenizer_1 = __importDefault(require("./tokenizer"));
const parser_1 = __importDefault(require("./parser"));
// Función para compilar un archivo dado
function Compiler(file) {
    const fileContent = (0, node_fs_1.readFileSync)(file, { encoding: 'utf-8' });
    // const lenguajeTokens = Tonekizer(fileContent);
    console.log(fileContent.split(/\n/));
    const lenguajeTokens = (0, tokenizer_1.default)(fileContent);
    const lenguajeAST = (0, parser_1.default)(lenguajeTokens);
    console.log(lenguajeTokens);
    console.log(lenguajeAST);
}
// Función para buscar archivos con una extensión específica en un directorio y sus subdirectorios
function SearchFiles(folderDirectory, extension) {
    // Array para almacenar las rutas de los archivos encontrados
    let directories = [];
    // Lee el contenido del directorio especificado
    const files = (0, node_fs_1.readdirSync)(folderDirectory, { withFileTypes: true });
    // Recorre cada elemento encontrado en el directorio
    files.map(file => {
        // Ruta completa del archivo o directorio actual
        const fullPath = (0, node_path_1.join)(folderDirectory, file.name);
        if (file.isDirectory()) {
            // Si es un directorio, se llama recursivamente a la función para buscar dentro de él
            directories = directories.concat(SearchFiles(fullPath, extension));
        }
        else if (file.isFile() && (0, node_path_1.extname)(file.name) === extension) {
            // Si es un archivo y tiene la extensión especificada, se agrega al array de resultados
            directories.push(fullPath);
        }
    });
    // Devuelve la lista completa de archivos encontrados
    return directories;
}
// Ejemplo de uso para buscar archivos con la extensión ".jsnovel" dentro de la carpeta "test"
const foundFiles = SearchFiles('test', '.jsnovel');
// Imprime en consola los resultados
console.log(foundFiles);
// Muestra los archivos encontrados
foundFiles.forEach(file => Compiler(file));
//# sourceMappingURL=index.js.map