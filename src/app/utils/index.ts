import { readFileSync } from 'node:fs'

type fileDataProps = string | string[]

export function fileData(path: fileDataProps): string | string[] {
    if (typeof path === 'string') return readFileSync(path, 'utf-8')
    return path.map((location) => readFileSync(location, 'utf-8'))
}