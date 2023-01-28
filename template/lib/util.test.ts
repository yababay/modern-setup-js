import { existsAndIsFile, existsAndIsDirectory } from './util'

test('Check files and directories', () => {
    expect(existsAndIsDirectory('do-not-remove-this')).toBeTruthy()
    expect(existsAndIsDirectory('do-not-remove-this/')).toBeTruthy()
    expect(existsAndIsDirectory('/do-not-remove-this')).toBeTruthy()
    expect(existsAndIsDirectory('/do-not-remove-this/')).toBeTruthy()
    expect(existsAndIsFile('/do-not-remove-this/index.pug')).toBeTruthy()
    expect(existsAndIsFile('do-not-remove-this/test-with-markdown.pug')).toBeTruthy()
    expect(existsAndIsFile('do-not-remove-this/test.png')).toBeTruthy()
    expect(existsAndIsFile('do-not-remove-this/test.svg')).toBeTruthy()
})
