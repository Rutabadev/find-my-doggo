import { Browser, BrowserContext } from 'playwright'
import qawolf from 'qawolf'

let browser: Browser
let context: BrowserContext

beforeAll(async () => {
  browser = await qawolf.launch()
  context = await browser.newContext()
  await qawolf.register(context)
})

afterAll(async () => {
  await qawolf.stopVideos()
  await browser.close()
})

describe('Dark mode', () => {
  test('desktop', async () => {
    const page = await context.newPage()
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('main')
    let className = await page.$eval('main', (el) => el.className)
    expect(className).toEqual('')
    let darkModeStorage = await page.evaluate(() =>
      window.localStorage.getItem('dark-mode')
    )
    expect(darkModeStorage).toEqual('false')
    await page.click('#dark-mode-switch-desktop')
    className = await page.$eval('main', (el) => el.className)
    expect(className).toEqual('dark')
    darkModeStorage = await page.evaluate(() =>
      window.localStorage.getItem('dark-mode')
    )
    expect(darkModeStorage).toEqual('true')
    await page.click('#dark-mode-switch-desktop')
    className = await page.$eval('main', (el) => el.className)
    expect(className).toEqual('')
    darkModeStorage = await page.evaluate(() =>
      window.localStorage.getItem('dark-mode')
    )
    expect(darkModeStorage).toEqual('false')
  })
})
