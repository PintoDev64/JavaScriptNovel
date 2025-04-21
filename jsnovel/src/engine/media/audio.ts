import { readFileSync } from "node:fs";

export default function AudioBuffer(audioDirectory: string): Buffer {
    return readFileSync(audioDirectory)
}