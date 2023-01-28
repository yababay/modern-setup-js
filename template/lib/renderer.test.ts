import { render } from './renderer'

test('Check parsing methods', () => {
    let html = render('/', {})
    expect(html.includes('</h1>')).toBeTruthy()
    html = render('/error', {})
    expect(html.includes('</h1>')).toBeTruthy()
    html = render('/do-not-remove-this', {})
    expect(html.includes('</h1>')).toBeTruthy()
})