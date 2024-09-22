import { readFileSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import Tonekizer from './tokenizer';
import Parser from './parser';

const Start = Date.now()

// Función para compilar un archivo dado
function Compiler(file: string) {
    const fileContent = readFileSync(file, { encoding: 'utf-8' });
    // const lenguajeTokens = Tonekizer(fileContent);
    
    const lenguajeTokens = Tonekizer(fileContent);
    console.log(lenguajeTokens);

    const lenguajeAST = Parser(lenguajeTokens)
    console.log(lenguajeAST.body);

    
    
    const End = Date.now()
    console.log(`Command Exec On ${End - Start} ms`)
}

// Función para buscar archivos con una extensión específica en un directorio y sus subdirectorios
function SearchFiles(folderDirectory: string, extension: string): string[] {
    // Array para almacenar las rutas de los archivos encontrados
    let directories: string[] = [];
    
    // Lee el contenido del directorio especificado
    const files = readdirSync(folderDirectory, { withFileTypes: true });

    // Recorre cada elemento encontrado en el directorio
    files.map(file => {
        // Ruta completa del archivo o directorio actual
        const fullPath = join(folderDirectory, file.name);
        
        if (file.isDirectory()) {
            // Si es un directorio, se llama recursivamente a la función para buscar dentro de él
            directories = directories.concat(SearchFiles(fullPath, extension));
        } else if (file.isFile() && extname(file.name) === extension) {
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
