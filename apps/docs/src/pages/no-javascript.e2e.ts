import { test, expect } from '@playwright/test'

// The site is prerendered and must work with JavaScript off: the mobile navigation drawer is an
// HTML popover its menu button opens through popovertarget, with no script involved.
test.describe('without JavaScript, on a phone-width window', () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 400, height: 800 } })

  test('the menu button opens the navigation drawer and Escape closes it', async ({ page }) => {
    await page.goto('/design-system/')
    const drawer = page.locator('#docs-nav')
    await expect(drawer).toBeHidden()

    await page.getByRole('button', { name: 'Open navigation' }).click()
    await expect(drawer).toBeVisible()
    await expect(
      drawer.getByRole('navigation', { name: 'Design system documentation' })
    ).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(drawer).toBeHidden()
  })

  test('a click outside the drawer closes it', async ({ page }) => {
    await page.goto('/design-system/')
    const drawer = page.locator('#docs-nav')
    await page.getByRole('button', { name: 'Open navigation' }).click()
    await expect(drawer).toBeVisible()

    await page.mouse.click(390, 400)
    await expect(drawer).toBeHidden()
  })

  test('a link in the drawer navigates', async ({ page }) => {
    await page.goto('/design-system/')
    await page.getByRole('button', { name: 'Open navigation' }).click()
    // Let the 225ms slide-in finish: with scripts off, Playwright's stability check can't
    // settle on an element that was still moving when it first looked.
    const link = page.locator('#docs-nav').getByRole('link', { name: 'Installation' })
    await expect(link).toBeVisible()
    await page.waitForTimeout(400)
    await link.click()
    await expect(page).toHaveURL(/\/design-system\/getting-started\/installation\//)
  })
})
