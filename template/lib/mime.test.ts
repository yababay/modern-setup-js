import { mimeIsLegal } from './mime'

test('Check legitimacy of the extension', () => {
    expect(mimeIsLegal('/do-not-remove-this/test.png')).toBeTruthy()
    expect(mimeIsLegal('/do-not-remove-this/test.svg')).toBeTruthy()
    expect(mimeIsLegal('/do-not-remove-this')).toBeFalsy()
    expect(mimeIsLegal('/do-not-remove-this/')).toBeFalsy()
    expect(mimeIsLegal('do-not-remove-this')).toBeFalsy()
    expect(mimeIsLegal('do-not-remove-this/')).toBeFalsy()
    expect(() => mimeIsLegal('/do-not-remove-this/test.illegal')).toThrow(/test.illegal/)
    expect(() => mimeIsLegal('/do-not-remove-this/index.pug')).toThrow(/index.pug/)
    expect(() => mimeIsLegal('/do-not-remove-this/test.md')).toThrow(/test.md/)
})
