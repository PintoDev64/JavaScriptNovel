"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckPerformance = CheckPerformance;
exports.SearchFiles = SearchFiles;
const fs_1 = require("fs");
const path_1 = require("path");
/**
 * Imprime en consola el tiempo de ejecucion de una funcion/instruccion
 */
function CheckPerformance(callback) {
    const Start = Date.now();
    try {
        return callback();
    }
    catch (error) {
        console.log(`\nMain Process -> ${error.name}\n└───┤ ${error.message}\n`);
    }
    finally {
        const End = Date.now();
        console.log(`\n >>> Command Exec On ${End - Start} ms <<<\n`);
    }
}
/**
 * Busca archivos por extension y en una ubicacion determinada
 */
function SearchFiles(folderDirectory, extension) {
    let directories = [];
    const files = (0, fs_1.readdirSync)(folderDirectory, { withFileTypes: true });
    files.map(file => {
        const fullPath = (0, path_1.join)(folderDirectory, file.name);
        if (file.isDirectory()) {
            directories = directories.concat(SearchFiles(fullPath, extension));
        }
        else if (file.isFile() && (0, path_1.extname)(file.name) === extension) {
            directories.push(fullPath);
        }
    });
    return directories;
}
