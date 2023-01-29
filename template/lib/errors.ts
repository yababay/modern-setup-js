import { Request, Response, NextFunction} from 'express'
import RenderingError from '../types/error'
import rendererPug from './pug'

export const ERROR_ILLEGAL_MIME_TYPE = (url: string) => new RenderingError(`Ресурсы данного типа не обслуживаются: ${url}.`, 406)
export const ERROR_TEMPLATE_NOT_FOUND = (url: string) => new RenderingError(`Не удалось найти шаблон: ${url}.`, 404)
export const ERROR_STATIC_FILE_NOT_FOUND = (url: string) => new RenderingError(`Не удалось найти файл: ${url}.`, 404)
export const ERROR_MARKDOWN_NOT_FOUND = (url: string) => new RenderingError(`Не удалось найти файл markdown: ${url}.`, 404)
export const ERROR_NO_RENDERER_FOUND = (url: string) => new RenderingError(`Не удалось найти обработчик для ресурса: ${url}.`, 500)
export const ERROR_CSS_IS_INCORRECT = (url: string) => new RenderingError(`Ошибка при обработке стилевых таблиц: ${url}.`, 500)

export default async (error: Error, req: Request, res: Response, next: NextFunction): Promise<void> => {
    if(!error) return next()
    console.error(error)
    const status = Reflect.get(error, 'status') || 500
    const { message } = error
    const html = rendererPug('/error.pug', {message, status})
    res.status(status).contentType('text/html').end(html)
}
