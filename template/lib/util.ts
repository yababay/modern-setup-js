import { existsSync, lstatSync } from 'fs'
import settings from './settings'
const { pagesDir } = settings

function existsAndIs(url: string, isFile = true) {
    if(!url.startsWith('/')) url = `/${url}`
    const path = `${pagesDir}${url}`
    if(!existsSync(path)) return false
    return isFile && lstatSync(path).isFile() || lstatSync(path).isDirectory()
}

export function existsAndIsFile(url: string) {
    return existsAndIs(url)
}

export function existsAndIsDirectory(url: string) {
    return existsAndIs(url, false)
}
