import { Request, Response, NextFunction} from 'express'
import { Renderer } from '../types/renderer'
import rendererPug from './renderer-pug'
import { existsAndIsDirectory, existsAndIsFile } from './util'
import settings from './settings'
const { pagesDir } = settings

const renderers = new Map<string | undefined, Renderer>([
    ['pug', rendererPug]
])

const rendererKeys = Array.from(renderers.keys())

export function render(url: string, context: object): string {
    if(existsAndIsDirectory(url)){
        if(!url.endsWith('/')) url += '/'
        url += 'index'
        return render(url, context)
    }
    for(const key of rendererKeys){
        const renderUrl = `${url}.${key}`
        if(!existsAndIsFile(`${renderUrl}`)) continue
        const render = renderers.get(key)
        if(render) return render(`${renderUrl}`, context)
    }
    throw Error('Renderer is not found')
}

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const url = req.originalUrl
    if(typeof url !== 'string') throw Error('Resource is not found.')
    const html = render(url, req.query)
    res.status(200).contentType('text/html').end(html)
}

