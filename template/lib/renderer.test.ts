import { render } from './renderer'

test('Check parsing methods', () => {
    let html = render('/', {})
    expect(html.includes('<!DOCTYPE html>')).toBeTruthy()
    html = render('/error', {})
    expect(html.includes('<!DOCTYPE html>')).toBeTruthy()
    html = render('/do-not-remove-this', {})
    expect(html.includes('<!DOCTYPE html>')).toBeTruthy()
})