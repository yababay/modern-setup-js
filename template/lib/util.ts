import { existsSync, lstatSync } from 'fs'
import { Request } from 'express'

import settings from './settings'
const { pagesDir } = settings

function existsAndIs(url: string, isFile = true, prefix = pagesDir) {
    if(!url.startsWith('/')) url = `/${url}`
    const path = `${prefix}${url}`
    if(!existsSync(path)) return false
    return isFile && lstatSync(path).isFile() || lstatSync(path).isDirectory()
}

export function existsAndIsFile(url: string, prefix = pagesDir) {
    return existsAndIs(url, true, prefix)
}

export function existsAndIsDirectory(url: string) {
    return existsAndIs(url, false)
}

export function prepareUrl(req: Request){
    let url = req.originalUrl
    const qsi = url.indexOf('?')
    if(qsi > -1) url = url.substring(0, qsi)
    return url
}
