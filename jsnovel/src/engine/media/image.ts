import { readFileSync } from "node:fs";

export default function ImageBuffer(audioDirectory: string): Buffer {
    return readFileSync(audioDirectory)
}