import { Request, Response, NextFunction} from 'express'
import { Renderer } from '../types/renderer'
import rendererPug from './pug'
import { existsAndIsDirectory, existsAndIsFile, prepareUrl } from './util'
import { ERROR_NO_RENDERER_FOUND } from './errors'

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
    throw ERROR_NO_RENDERER_FOUND(url)
}

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const url = prepareUrl(req)
        const html = render(url, req.query)
        res.status(200)
        res.contentType('text/html')
        res.end(html)
    }
    catch(err){
        next(err)
    }
}
