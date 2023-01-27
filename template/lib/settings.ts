import path from 'path'
import { readFileSync } from 'fs'
import { RenderingSettings, SeoProperties } from '../types/settings'

const projectDir = process.cwd()

function prepareErrors(path: string): Error[] {
    const array = JSON.parse(readFileSync(path, 'utf8'))
    if (!Array.isArray(array)) throw 'Не удалось прочитать описания ошибок.'
    return array.map(el => {
        if (!Array.isArray(el)) throw 'Не удалось прочитать описание ошибки.'
        const [message, cause] = el
        if (typeof message !== 'string') throw 'Не удалось прочитать сообщение ошибки.'
        if (typeof cause !== 'number') throw 'Не удалось прочитать код ошибки.'
        const error = new Error(message)
        Reflect.set(error, 'cause', cause)
        return error
    })
}

function prepareMimetypes(path: string): Map<string, string> {
    const array = JSON.parse(readFileSync(path, 'utf8'))
    if (!Array.isArray(array)) throw 'Не удалось прочитать описания mime-типов.'
    return array.reduce((acc, el) => {
        if (!Array.isArray(el)) throw 'Не удалось прочитать описание mime-типа.'
        const [ext, mime] = el
        if (typeof ext !== 'string') throw 'Не удалось прочитать расширение.'
        if (typeof mime !== 'string') throw 'Не удалось прочитать тип.'
        acc.set(ext, mime)
        return acc
    }, new Map<string, string>())
}

function prepareSettings(path: string): Map<string, string | number> {
    const props = JSON.parse(readFileSync(path, 'utf8'))
    if (typeof props !== 'object' && props != null) throw 'Не удалось прочитать описания свойств.'
    return Reflect.ownKeys(props).reduce((acc, key) => {
        const prop = props[key]
        if (typeof key !== 'string')  throw 'Не удалось прочитать ключ свойства.'
        if(!(typeof prop === 'string' || typeof prop === 'number' )) throw 'Не удалось прочитать описание свойства.'
        acc.set(key, prop)
        return acc
    }, new Map<string, (string | number)>())
}

const srcDir = path.resolve(projectDir, 'src')
const libDir = path.resolve(projectDir, 'lib')
const publicDir = path.resolve(projectDir, 'public')
const pagesDir = path.resolve(srcDir, 'pages')

const settingsPath = path.resolve(srcDir, 'settings.json')
const errorsPath = path.resolve(libDir, 'errors.json')
const mimetypesPath = path.resolve(libDir, 'mime-types.json')
const cssUrl = '/styles.css'
const cssPath = path.resolve(srcDir, cssUrl.substring(1))

const settings = prepareSettings(settingsPath)
const mimetypes = prepareMimetypes(mimetypesPath)
const extensions = Array.from(mimetypes.keys())

const [
    ERROR_RESOURCE_NOT_FOUND,
    ERROR_ILLEGAL_MIMETYPE,
    ERROR_RENDERER_NOT_FOUND
] = prepareErrors(errorsPath)

function getStringFromSettings(key: string): string{
    const value = settings.get(key)
    if(typeof value !== 'string') throw `По ключу ${key} ожидалась строка.`
    return value
}

function getNumberFromSettings(key: string): number{
    const value = settings.get(key)
    if(typeof value !== 'number') throw `По ключу ${key} ожидалось число.`
    return value
}

const seo: SeoProperties = {
    keywords: getStringFromSettings('keywords'),
    robots: getStringFromSettings('robots'),
    description: getStringFromSettings('description'),
    title: getStringFromSettings('title'),
    motto: getStringFromSettings('motto'),
    author: getStringFromSettings('author'),
    og_type: getStringFromSettings('og_type'),
    og_title: getStringFromSettings('og_title'),
    og_description: getStringFromSettings('og_description'),
    og_image: getStringFromSettings('og_image'),
    og_url: getStringFromSettings('og_url'),
    og_site_name: getStringFromSettings('og_site_name'),
    year: getNumberFromSettings('year'),
}

export const output: RenderingSettings = {
    publicDir,
    pagesDir,
    mimetypes,
    extensions,
    seo,
    ERROR_RESOURCE_NOT_FOUND,
    ERROR_ILLEGAL_MIMETYPE,
    ERROR_RENDERER_NOT_FOUND
}

export default output
