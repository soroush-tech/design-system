import { expect, test, type Page } from '@playwright/test'

// The page is a server component. Its static components are styled by the theme the app registered:
// the tokens, the `defaults` and a look from `components`, in the first HTML, so a browser with no
// JavaScript shows them. The interactive components are client components the page renders.
//
// The colors of `app/theme.ts`: each theme has its own brand, paper and text.primary (the dark
// theme's text is the library's own).
// The library's own primary color, which the variant of the Card uses as a token.
const primary = 'rgb(0, 252, 64)'
const light = { brand: 'rgb(10, 122, 90)', paper: 'rgb(244, 241, 238)', text: 'rgb(10, 122, 90)' }
const dark = { brand: 'rgb(61, 220, 151)', paper: 'rgb(19, 19, 19)', text: 'rgb(0, 252, 64)' }

const style = (page: Page, testId: string, property: string) =>
  page
    .getByTestId(testId)
    .evaluate((element, name) => getComputedStyle(element).getPropertyValue(name), property)

const expectStaticLook = async (page: Page, colors: typeof light) => {
  // A token: the page's background and the text color come from the theme's scales.
  expect(await style(page, 'paper', 'background-color')).toBe(colors.paper)
  expect(await style(page, 'text', 'color')).toBe(colors.text)
  // A default: `defaults.surfaceRadius` is `lg` (16px); the library's own is none.
  expect(await style(page, 'paper', 'border-top-left-radius')).toBe('16px')
  // A look from the theme: `components.Card.variants` for the `interactive` variant.
  expect(await style(page, 'card', 'border-left-color')).toBe(primary)
  expect(await style(page, 'card', 'border-left-width')).toBe('4px')
  // The brand color on a static component.
  expect(
    await page
      .getByTestId('progress')
      .locator('circle')
      .last()
      .evaluate((element) => getComputedStyle(element).stroke)
  ).toBe(colors.brand)
  expect(await style(page, 'skeleton', 'width')).toBe('96px')
  expect(await style(page, 'title', 'font-weight')).toBe('700')
}

test.describe('with no JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('the static components have the theme in the first HTML', async ({ page }) => {
    await page.goto('/')
    await expectStaticLook(page, light)
  })

  test('the client components are rendered and styled too', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('counter')).toHaveText('Clicked 0')
    expect(await style(page, 'counter', 'background-color')).toBe(light.brand)
    await expect(page.getByRole('tab')).toHaveCount(2)
    await expect(page.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true')
  })

  test('the server chooses the theme from the cookie', async ({ page, context, baseURL }) => {
    await context.addCookies([{ name: 'scheme', value: 'dark', url: baseURL! }])
    await page.goto('/')
    await expectStaticLook(page, dark)
  })
})

test.describe('with JavaScript', () => {
  test('hydrates without a console error or a hydration warning', async ({ page }) => {
    const problems: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error' || /hydrat/i.test(message.text()))
        problems.push(message.text())
    })
    page.on('pageerror', (error) => problems.push(error.message))
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.getByTestId('counter').click()
    expect(problems).toEqual([])
  })

  test('the client components work', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('counter').click()
    await expect(page.getByTestId('counter')).toHaveText('Clicked 1')
    await page.getByRole('tab', { name: 'Two' }).click()
    await expect(page.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true')
    await expect(page.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'false')
  })

  test('the switch moves the page between light and dark, and the choice is kept', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await expectStaticLook(page, light)
    await page.getByTestId('switch').click()
    await expect.poll(() => style(page, 'paper', 'background-color')).toBe(dark.paper)
    await expectStaticLook(page, dark)
    await page.reload()
    await expectStaticLook(page, dark)
    await page.getByTestId('switch').click()
    await expect.poll(() => style(page, 'paper', 'background-color')).toBe(light.paper)
  })
})
