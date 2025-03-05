import { readFileSync } from 'node:fs';
import { ERROR_DEFINITIONS } from '../error';
import { resolve } from 'node:path';
import { NUtils } from 'src/types';

export const Colors: NUtils.Colors = {
    ErrorText: (text: string) => `\x1b[31m${text}\x1b[0m`,
    WarningText: (text: string) => `\x1b[33m${text}\x1b[0m`,
    InfoText: (text: string) => `\x1b[36m${text}\x1b[0m`,
    SuccessText: (text: string) => `\x1b[32m${text}\x1b[0m`
};

export const Utilities: NUtils.Utilities = {
    getEnviroment: () => process.env["NODE_ENV"],
    getCurrentDateTime: (local: Intl.LocalesArgument) => new Date().toLocaleString(local),
    getSyncJSONFile: (path: string) => {
        try {
            const FileContentUTF8 = readFileSync(path, { encoding: 'utf-8' })
            return JSON.parse(FileContentUTF8);
        } catch (error: unknown) {
            console.log(
                Colors.WarningText(`${ERROR_DEFINITIONS.SETTINGS.MISSING}: `),
                Colors.InfoText(`Using default configuration`)
            );
            return undefined
        }
    },
    getLibraryFiles: () => {
        console.log("getLibraryFiles: ", Utilities.getEnviroment());
        console.log("getLibraryFiles: ", __dirname);

        if (Utilities.getEnviroment() === "development") {
            console.log(resolve(__dirname, '../files').replace(/\\/g, "/"));
            return resolve(__dirname, '../files').replace(/\\/g, "/")
        }
        console.log(resolve(__dirname, '../files').replace(/\\/g, "/"));
        return resolve(__dirname, '../files').replace(/\\/g, "/")
    },
    getProjectFiles: (fileURl: string | string[]) => {
        if (fileURl instanceof Array) {
            console.log("getProjectFiles: ", resolve(process.cwd(), ...fileURl).replace(/\\/g, "/"));
            return resolve(process.cwd(), ...fileURl).replace(/\\/g, "/");
        }
        console.log("getProjectFiles: ", resolve(process.cwd(), fileURl).replace(/\\/g, "/"));
        return resolve(process.cwd(), fileURl).replace(/\\/g, "/");
    }

}

export const LogFunctions: NUtils.LogFunctions = {
    Process: (text: string) => console.log(Colors.InfoText(`|> ${text}`))
}