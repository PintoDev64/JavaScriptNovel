import { readFileSync } from "node:fs";

export default function AudioToBuffer(audioDirectory: string): Buffer {
    return readFileSync(audioDirectory)
}