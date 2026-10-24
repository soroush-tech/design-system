import { test, expect } from '@playwright/test'

test.describe('packages', () => {
  test('the rail has Packages, and its page lists every package with its links', async ({
    page,
  }) => {
    await page.goto('/design-system/')
    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: 'Packages' })
      .click()
    await expect(page).toHaveURL(/\/packages\/$/)
    await expect(page.getByRole('heading', { level: 1, name: 'Packages' })).toBeVisible()
    for (const name of ['Design System', 'Markdown', 'Styled System', 'MCP server', 'UI spec']) {
      await expect(page.locator('main').getByRole('heading', { level: 2, name })).toBeVisible()
    }
    await expect(page.locator('main').getByRole('link', { name: 'npm' }).first()).toHaveAttribute(
      'href',
      /npmjs\.com\/package\/@soroush\.tech\//
    )
  })

  test('the sidebar lists the packages, the documented ones in the docs and the others outside', async ({
    page,
  }) => {
    await page.goto('/packages/')
    const nav = page.getByRole('navigation', { name: 'Design system documentation' })
    await expect(nav.getByRole('link', { name: 'All packages' })).toHaveAttribute(
      'aria-current',
      'page'
    )
    await expect(nav.getByRole('link', { name: /^Markdown\s*v\d/ })).toHaveAttribute(
      'href',
      '/markdown/'
    )
    const mcp = nav.getByRole('link', { name: /MCP server/ })
    await expect(mcp).toHaveAttribute('target', '_blank')
    await expect(mcp).toHaveAttribute('href', /github\.com\/soroush-tech\/design-system/)
  })

  test("a component's head links its source on GitHub", async ({ page }) => {
    await page.goto('/design-system/components/button/')
    await expect(page.locator('main header').getByRole('link', { name: 'Source' })).toHaveAttribute(
      'href',
      'https://github.com/soroush-tech/design-system/tree/main/packages/design-system/src/Button'
    )
  })
})
