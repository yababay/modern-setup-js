import rendererPug, { parseMarkdown, parsePug } from './renderer-pug'

test('Check parsing methods', () => {
    let output = parsePug('/do-not-remove-this/index.pug')
    expect(output.includes('</h1>')).toBeTruthy()
    output = parseMarkdown('/do-not-remove-this/test.md')
    expect(output.includes('</h1>')).toBeTruthy()
})

test('Check rendering', () => {
    const testUrl = '/do-not-remove-this/test-with-markdown.pug'
    const html = rendererPug(testUrl, {})
    expect(typeof html).toBe('string')
    expect(html.includes('</title>')).toBeTruthy()
    expect(html.includes('</h1>')).toBeTruthy()
    expect(html.includes('</p>')).toBeTruthy()
    expect(html.includes('Lorem ipsum')).toBeTruthy()
})
