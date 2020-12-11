import { Browser, BrowserContext, devices } from 'playwright'
import qawolf from 'qawolf'
const device = devices['Pixel 2']

let browser: Browser
let context: BrowserContext

beforeAll(async () => {
  browser = await qawolf.launch()
  context = await browser.newContext({ ...device })
  await qawolf.register(context)
})

afterAll(async () => {
  await qawolf.stopVideos()
  await browser.close()
})

test('darkModeMobile', async () => {
  const page = await context.newPage()
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' })
  await page.click('#toggle-sidebar')
  let className = await page.$eval('main', (el) => el.className)
  expect(className).toEqual('')
  let darkModeStorage = await page.evaluate(() =>
    window.localStorage.getItem('dark-mode')
  )
  expect(darkModeStorage).toEqual('false')
  await page.click('#dark-mode-switch-mobile')
  className = await page.$eval('main', (el) => el.className)
  expect(className).toEqual('dark')
  darkModeStorage = await page.evaluate(() =>
    window.localStorage.getItem('dark-mode')
  )
  expect(darkModeStorage).toEqual('true')
  await page.click('#dark-mode-switch-mobile')
  className = await page.$eval('main', (el) => el.className)
  expect(className).toEqual('')
  darkModeStorage = await page.evaluate(() =>
    window.localStorage.getItem('dark-mode')
  )
  expect(darkModeStorage).toEqual('false')
  await page.click('#close-sidebar')
})
