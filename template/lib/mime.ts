import { Request, Response, NextFunction} from 'express'
import { existsAndIsFile, existsAndIsDirectory } from './util'
import { ERROR_ILLEGAL_MIME_TYPE, ERROR_STATIC_FILE_NOT_FOUND } from './errors'

import settings from './settings'

const { extensions, pagesDir } = settings

export function mimeIsLegal(url: string): boolean{
  if(existsAndIsDirectory(url)) return false
  let extReg = /.*\.(\w+)$/.exec(url)
  if(!extReg || !Array.isArray(extReg)) return false
  const ext = extReg[1]
  if(!extensions.includes(ext)) throw ERROR_ILLEGAL_MIME_TYPE(url)
  if(!existsAndIsFile(url)) throw ERROR_STATIC_FILE_NOT_FOUND(url)
  return true
}

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let url = req.originalUrl
  const qsi = url.indexOf('?')
  if(qsi > -1) url = url.substring(0, qsi)
  try {
    if(mimeIsLegal(url)) return res.sendFile(`${pagesDir}${url}`)
    next()
  }
  catch(err){
    next(err)
  }
}
