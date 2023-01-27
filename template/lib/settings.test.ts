import { existsSync, lstatSync } from 'fs'
import { output } from './settings'
const {
    publicDir,
    pagesDir,
    mimetypes,
    extensions,
    seo,
    ERROR_RESOURCE_NOT_FOUND,
    ERROR_ILLEGAL_MIMETYPE,
    ERROR_RENDERER_NOT_FOUND
} = output

const {
    keywords,
    robots,
    description,
    title,
    motto,
    author,
    og_type,
    og_title,
    og_description,
    og_image,
    og_url,
    og_site_name,
    year
} = seo

test('SEO keys should be set up', () => {
    expect([
        keywords,
        robots,
        description,
        title,
        motto,
        author,
        og_type,
        og_title,
        og_description,
        og_image,
        og_url,
        og_site_name,
    ].every(key => typeof key === 'string')).toBeTruthy()
    expect(typeof year === 'number').toBeTruthy()
})

test('Errors should be prepared', () => {
    expect(Reflect.get(ERROR_RESOURCE_NOT_FOUND, 'cause')).toBe(404)
    expect(Reflect.get(ERROR_ILLEGAL_MIMETYPE, 'cause')).toBe(406)
    expect(Reflect.get(ERROR_RENDERER_NOT_FOUND, 'cause')).toBe(500)
    expect(ERROR_RESOURCE_NOT_FOUND instanceof Error).toBeTruthy()
    expect(ERROR_ILLEGAL_MIMETYPE instanceof Error).toBeTruthy()
    expect(ERROR_RENDERER_NOT_FOUND instanceof Error).toBeTruthy()
})

test('Files and directories sould exist', () => {
    expect(existsSync(publicDir) && lstatSync(publicDir).isDirectory()).toBeTruthy()
    expect(existsSync(pagesDir) && lstatSync(pagesDir).isDirectory()).toBeTruthy()
    expect(mimetypes.get('jpg')).toBe('image/jpeg')
    expect(extensions.includes('png')).toBeTruthy()
})
