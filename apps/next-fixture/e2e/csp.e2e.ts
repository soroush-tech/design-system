import { expect, test, type Page } from '@playwright/test'

// proxy.ts sends every page with a strict policy and a new nonce for each request, and no
// 'unsafe-inline' for styles: every style the pages show comes from an element that carries the nonce.
const light = { paper: 'rgb(244, 241, 238)', padding: '24px' }
const dark = { paper: 'rgb(19, 19, 19)', padding: '24px' }

/** The violations of the policy the page reports, kept from the first script on. */
const watch = async (page: Page) => {
  const violations: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error' || /Content Security Policy|\[umber\]/i.test(message.text()))
      violations.push(message.text())
  })
  page.on('pageerror', (error) => violations.push(error.message))
  return violations
}

const style = (page: Page, testId: string, property: string) =>
  page
    .getByTestId(testId)
    .evaluate((element, name) => getComputedStyle(element).getPropertyValue(name), property)

const expectLook = async (page: Page, testId: string, colors: typeof light) => {
  expect(await style(page, testId, 'background-color')).toBe(colors.paper)
  expect(await style(page, testId, 'padding-top')).toBe(colors.padding)
}

const nonceOf = (policy: string | undefined) => /style-src 'nonce-([^']+)'/.exec(policy ?? '')?.[1]

test.describe('with no JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('the first load is styled by elements that carry the nonce', async ({ page }) => {
    const response = await page.goto('/')
    const nonce = nonceOf(response?.headers()['content-security-policy'])
    expect(nonce).toBeTruthy()
    await expectLook(page, 'paper', light)
    const nonces = await page
      .locator('style')
      .evaluateAll((elements) => elements.map((element) => element.nonce))
    expect(nonces.length).toBeGreaterThan(0)
    expect(new Set(nonces)).toEqual(new Set([nonce]))
  })

  test('the second page is styled too', async ({ page }) => {
    await page.goto('/other')
    await expectLook(page, 'other-paper', light)
  })
})

test.describe('with JavaScript', () => {
  test('a new nonce for each request, and no violation on the way', async ({ page }) => {
    const violations = await watch(page)
    const first = nonceOf((await page.goto('/'))?.headers()['content-security-policy'])
    await page.waitForLoadState('networkidle')
    await expectLook(page, 'paper', light)
    const second = nonceOf((await page.reload())?.headers()['content-security-policy'])
    await page.waitForLoadState('networkidle')
    expect(first).toBeTruthy()
    expect(second).not.toBe(first)
    await expectLook(page, 'paper', light)
    expect(violations).toEqual([])
  })

  test('a client-side navigation both ways keeps the styles', async ({ page }) => {
    const violations = await watch(page)
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.getByTestId('to-other').click()
    await expect(page.getByTestId('other-title')).toBeVisible()
    await expectLook(page, 'other-paper', light)
    await page.getByTestId('to-home').click()
    await expect(page.getByTestId('title')).toBeVisible()
    await expectLook(page, 'paper', light)
    expect(violations).toEqual([])
  })

  test('a theme switch and a component that mounts later are styled', async ({ page }) => {
    const violations = await watch(page)
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.getByTestId('show-later').click()
    await expect(page.getByTestId('later')).toBeVisible()
    expect(await style(page, 'later', 'padding-top')).toBe('40px')
    await page.getByTestId('switch').click()
    await expect.poll(() => style(page, 'paper', 'background-color')).toBe(dark.paper)
    await expectLook(page, 'paper', dark)
    await page.getByTestId('switch').click()
    await expect.poll(() => style(page, 'paper', 'background-color')).toBe(light.paper)
    expect(violations).toEqual([])
  })
})
