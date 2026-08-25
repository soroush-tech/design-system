import { test, expect } from '@playwright/test'

test.describe('landing page', () => {
  test('renders the hero and the document title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/SOROUSH\.DESIGN/)
    await expect(
      page.getByRole('heading', { name: 'Build with the @soroush.tech design system' })
    ).toBeVisible()
    await expect(page.getByText('npm i @soroush.tech/design-system')).toBeVisible()
  })

  test('theme toggle switches the color scheme', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: 'Toggle color scheme' })
    await expect(toggle).toHaveText('Light')
    await toggle.click()
    await expect(toggle).toHaveText('Dark')
  })
})
