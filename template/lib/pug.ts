import { existsSync, readFileSync } from 'fs'
import { compileFile } from "pug"
import showdown from 'showdown'

import settings from './settings'
import { Renderer } from '../types/renderer'
import { ERROR_TEMPLATE_NOT_FOUND, ERROR_MARKDOWN_NOT_FOUND } from './errors'

const { pagesDir, seo } = settings
const { Converter } = showdown
const converter = new Converter()

const rendererPug: Renderer = (url: string, context = {}): string => {
  const locals = {...seo, ...context}
  const options = getOptions(url)
  return parsePug(url, options, locals)
}

function getOptions(url: string){
  let pathReg = /(.*)\/[^\/]+$/.exec(url)
  if(!pathReg) throw ERROR_TEMPLATE_NOT_FOUND(url)
  const path = pathReg[1]
  return {
    filters: {
      markdown: (text: string, opts: object) => {
        if(!(opts && Reflect.get(opts, 'from'))) return converter.makeHtml(text)
        const mdUrl = `${path}/${Reflect.get(opts, 'from')}`
        return parseMarkdown(mdUrl)
      }
    }
  }
}

export function parsePug(url: string, options = {}, locals = {}){
  if(!url.startsWith('/')) url = `/${url}`
  return compileFile(`${pagesDir}${url}`, options)(locals)
}

export function parseMarkdown(url: string){
  const fn = `${pagesDir}${url}`
  if(!existsSync(fn)) throw ERROR_MARKDOWN_NOT_FOUND(url)
  const text = readFileSync(fn, 'utf8')
  return converter.makeHtml(text)
}

export default rendererPug
