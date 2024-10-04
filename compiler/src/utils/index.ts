import { readdirSync } from "fs"
import { extname, join } from "path"

// TypeScript
type CheckTimePerformanceParams = () => void | any

/**
 * Imprime en consola el tiempo de ejecucion de una funcion/instruccion
 */
export function CheckPerformance(callback: CheckTimePerformanceParams): any {
    const Start = Date.now()

    try {
        return callback()
    } catch (error: any) {
        console.log(
            `\nMain Process -> ${(error as Error).name}\n└───┤ ${(error as Error).message}\n`
        )
    } finally {
        const End = Date.now()
        console.log(`\n >>> Command Exec On ${End - Start} ms <<<\n`)
    }
}

/**
 * Busca archivos por extension y en una ubicacion determinada
 */
export function SearchFiles(folderDirectory: string, extension: string): string[] {
    let directories: string[] = [];

    const files = readdirSync(folderDirectory, { withFileTypes: true });

    files.map(file => {
        const fullPath = join(folderDirectory, file.name);

        if (file.isDirectory()) {
            directories = directories.concat(SearchFiles(fullPath, extension));
        } else if (file.isFile() && extname(file.name) === extension) {
            directories.push(fullPath);
        }
    });

    return directories;
}