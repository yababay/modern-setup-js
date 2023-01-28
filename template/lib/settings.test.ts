import { existsSync, lstatSync } from 'fs'
import settings from './settings'
const {
    publicDir,
    pagesDir,
    mimetypes,
    extensions,
    seo,
    cssInput,
    cssOutput
} = settings

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

test('Files and directories sould exist', () => {
    expect(existsSync(publicDir) && lstatSync(publicDir).isDirectory()).toBeTruthy()
    expect(existsSync(pagesDir) && lstatSync(pagesDir).isDirectory()).toBeTruthy()
    expect(existsSync(cssInput) && lstatSync(cssInput).isFile()).toBeTruthy()
    expect(existsSync(cssOutput) && lstatSync(cssOutput).isFile()).toBeTruthy()
    expect(mimetypes.get('jpg')).toBe('image/jpeg')
    expect(extensions.includes('png')).toBeTruthy()
})
