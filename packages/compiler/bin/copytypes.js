const { existsSync, copyFileSync, readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const src = join(__dirname, "../src/types.d.ts");
const destDir = join(__dirname, "../dist/types");
const dest = join(destDir, "types.d.ts");

if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
}

const indexTypesDir = join(__dirname, "../dist/types/index.d.ts");
const IndexTypesContent = readFileSync(indexTypesDir, { encoding: 'utf-8' })

const newIndexTypesContent = `/// <reference path="./types.d.ts" />\n\n${IndexTypesContent}`
writeFileSync(indexTypesDir, newIndexTypesContent)

copyFileSync(src, dest);
console.log("✅ Archivo copiado:", dest);