import { Request, Response, NextFunction} from 'express'
import sass from 'sass'
import { prepareUrl, existsAndIsFile } from './util'

import { ERROR_CSS_IS_INCORRECT } from './errors'
import settings from './settings'

const { stylesDir } = settings

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let url = prepareUrl(req)
        if(!url.endsWith('.css')) return next()
        if(existsAndIsFile(url, stylesDir)) return res.sendFile(`${stylesDir}${url}`)
        url = url.slice(0, -4) + '.scss'
        if(!existsAndIsFile(`${url}`, stylesDir)) throw ERROR_CSS_IS_INCORRECT(url)
        let styles = sass.compile(`${stylesDir}${url}`, {style: "compressed"})
        res.status(200)
        res.contentType('text/css')
        res.end(styles.css)
    }
    catch(err){
        next(err)
    }
}
