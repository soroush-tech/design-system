import { test, expect } from '@playwright/test'

test.describe('landing page', () => {
  test('renders the hero and the document title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/SOROUSH\.DESIGN/)
    await expect(
      page.getByRole('heading', { level: 1, name: 'A design system made of tokens, not guesses' })
    ).toBeVisible()
    await expect(page.getByText('npm i @soroush.tech/design-system')).toBeVisible()
  })

  test('opens the docs from its buttons and lists the three packages', async ({ page }) => {
    await page.goto('/')
    const main = page.locator('main')
    await expect(main.getByRole('link', { name: 'Get started' })).toHaveAttribute(
      'href',
      '/design-system/getting-started/installation/'
    )
    await expect(main.getByRole('link', { name: 'Browse components' })).toHaveAttribute(
      'href',
      '/design-system/components/'
    )
    for (const name of ['Design System', 'Markdown', 'Styled System']) {
      await expect(page.getByRole('link', { name: `${name} documentation` })).toBeVisible()
    }
    await expect(page.getByRole('heading', { level: 3, name: 'Tokens first' })).toBeVisible()
  })

  test('marks Home as the current part in the rail', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Home' })
    ).toHaveAttribute('aria-current', 'page')
  })

  test('theme toggle switches the color scheme', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: 'Toggle color scheme' })
    const ground = await page
      .locator('body')
      .evaluate((body) => getComputedStyle(body).backgroundColor)
    await toggle.click()
    await expect(page.locator('body')).not.toHaveCSS('background-color', ground)
  })
})
