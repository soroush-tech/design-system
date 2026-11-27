import { test, expect } from '@playwright/test'

test.describe('markdown section', () => {
  test('overview renders the README', async ({ page }) => {
    await page.goto('/react/markdown/')
    await expect(page).toHaveTitle(/Markdown · Gild UI/)
    await expect(page.getByRole('heading', { level: 1, name: 'Markdown' })).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Markdown documentation' })).toBeVisible()
  })

  test('the releases are a page of their own, headed by the version alone', async ({ page }) => {
    await page.goto('/react/markdown/releases/')
    await expect(page.getByRole('heading', { level: 1, name: 'Releases' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'v0.1.0' })).toBeVisible()
    await expect(page.getByText('@gild-ui/react-markdown@')).toHaveCount(0)
  })

  test('a markdown component page renders its README', async ({ page }) => {
    await page.goto('/react/markdown/Preview/')
    await expect(page.getByRole('heading', { level: 1, name: 'Preview' })).toBeVisible()
  })
})

test.describe('styled-system section', () => {
  test('is one page that points to the package repository', async ({ page }) => {
    await page.goto('/styled-system/')
    await expect(page.getByRole('heading', { level: 1, name: 'Styled System' })).toBeVisible()
    await expect(page.getByText('npm i @soroush.tech/styled-system')).toBeVisible()
    await expect(
      page.getByRole('main').getByRole('link', { name: 'Source on GitHub' })
    ).toHaveAttribute('href', 'https://github.com/soroush-tech/styled-system')
    await expect(
      page.getByRole('main').getByRole('link', { name: 'Documentation' })
    ).toHaveAttribute('href', 'https://github.com/soroush-tech/styled-system/tree/main/docs')
  })
})

test.describe('mcp, ui-spec and cli sections', () => {
  for (const [path, name] of [
    ['mcp', 'MCP server'],
    ['ui-spec', 'UI spec'],
    ['cli', 'Command line'],
  ]) {
    test(`${name} has an overview and its releases`, async ({ page }) => {
      await page.goto(`/${path}/`)
      await expect(page.getByRole('heading', { level: 1, name })).toBeVisible()
      const nav = page.getByRole('navigation', { name: `${name} documentation` })
      await nav.getByRole('link', { name: 'Releases' }).click()
      await expect(page).toHaveURL(new RegExp(`/${path}/releases/$`))
      await expect(page.getByRole('heading', { level: 1, name: 'Releases' })).toBeVisible()
      await expect(page.getByRole('heading', { name: /^v\d+\.\d+\.\d+$/ }).first()).toBeVisible()
    })
  }
})

test.describe('cross-section chrome', () => {
  test('the sidebar picks the package, and opens the one that is chosen', async ({ page }) => {
    await page.goto('/react/')
    const nav = page.getByRole('navigation', { name: 'Gild UI documentation' })
    await nav.getByRole('combobox', { name: 'Package' }).click()
    await expect(page.getByRole('option', { name: 'Gild UI for React' })).toBeVisible()
    await expect(page.getByRole('option', { name: 'Styled System' })).toBeVisible()
    await page.getByRole('option', { name: 'Markdown' }).click()
    await expect(page).toHaveURL(/\/react\/markdown\/$/)
  })

  test('the sitemap lists live pages only', async ({ page }) => {
    const response = await page.request.get('/sitemap.xml')
    expect(response.ok()).toBe(true)
    const xml = await response.text()
    expect(xml).toContain('https://gild-ui.soroush.design/react/')
    expect(xml).toContain('https://gild-ui.soroush.design/react/markdown/')
  })
})
