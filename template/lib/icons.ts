import { readFileSync, existsSync } from 'fs'
import { Request, Response, NextFunction} from 'express'
import { ERROR_STATIC_FILE_NOT_FOUND } from './errors'
import settings from './settings'

const { iconsDir } = settings

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	let url = req.originalUrl
	const qsi = url.indexOf('?')
	if(qsi > -1) url = url.substring(0, qsi)
	const localUrl = url.replace('/bi-', '/')
	const localPath = `${iconsDir}${localUrl}`
	if(!existsSync(localPath)) return next(ERROR_STATIC_FILE_NOT_FOUND(url))
	const icon = readFileSync(localPath, 'utf8')
	res.status(200).contentType('image/svg+xml').end(icon)
}
