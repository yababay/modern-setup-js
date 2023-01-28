import { readFile } from 'fs/promises'
import { Request, Response, NextFunction} from 'express'
import autoprefixer  from 'autoprefixer'
import postcss from 'postcss'
import tailwind from 'tailwindcss'

import settings from './settings'

const { cssInput } = settings

let cache: string

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    return await readFile(cssInput, 'utf8')
    .then(data => postcss([tailwind, autoprefixer]).process(data, {from: cssInput}))
    .then(data => {
        if(!cache) cache = data.css
       res.status(200).contentType('text/css').end(cache)
    })
}
