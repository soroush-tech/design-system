import { test, expect } from '@playwright/test'

test.describe('markdown section', () => {
  test('overview renders the README', async ({ page }) => {
    await page.goto('/markdown/')
    await expect(page).toHaveTitle(/Markdown · SOROUSH\.DESIGN/)
    await expect(page.getByRole('heading', { level: 1, name: 'Markdown' })).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Markdown documentation' })).toBeVisible()
  })

  test('the releases are a page of their own, headed by the version alone', async ({ page }) => {
    await page.goto('/markdown/releases/')
    await expect(page.getByRole('heading', { level: 1, name: 'Releases' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'v1.2.3' })).toBeVisible()
    await expect(page.getByText('@soroush.tech/markdown@')).toHaveCount(0)
  })

  test('a markdown component page renders its README', async ({ page }) => {
    await page.goto('/markdown/components/preview/')
    await expect(page.getByRole('heading', { level: 1, name: 'Preview' })).toBeVisible()
  })
})

test.describe('styled-system section', () => {
  test('overview renders the README', async ({ page }) => {
    await page.goto('/styled-system/')
    await expect(page.getByRole('heading', { level: 1, name: 'Styled System' })).toBeVisible()
  })

  test('a docs page and a guide page render from the package docs', async ({ page }) => {
    await page.goto('/styled-system/docs/responsive-styles/')
    await expect(page).toHaveTitle(/Responsive styles · SOROUSH\.DESIGN/)
    await page.goto('/styled-system/docs/guides/spacing/')
    await expect(page).toHaveTitle(/Spacing · SOROUSH\.DESIGN/)
  })

  test('the links between the package docs open the pages, not the markdown files', async ({
    page,
  }) => {
    await page.goto('/styled-system/docs/guides/')
    await page.getByRole('main').getByRole('link', { name: 'Theming' }).click()
    await expect(page).toHaveURL(/\/styled-system\/docs\/guides\/theming\/$/)
    await expect(page).toHaveTitle(/Theming/)
  })
})

test.describe('cross-section chrome', () => {
  test('the sidebar picks the package, and opens the one that is chosen', async ({ page }) => {
    await page.goto('/design-system/')
    const nav = page.getByRole('navigation', { name: 'Design system documentation' })
    await nav.getByRole('combobox', { name: 'Package' }).click()
    await expect(page.getByRole('option', { name: 'Design System' })).toBeVisible()
    await expect(page.getByRole('option', { name: 'Styled System' })).toBeVisible()
    await page.getByRole('option', { name: 'Markdown' }).click()
    await expect(page).toHaveURL(/\/markdown\/$/)
  })

  test('the sitemap lists live pages only', async ({ page }) => {
    const response = await page.request.get('/sitemap.xml')
    expect(response.ok()).toBe(true)
    const xml = await response.text()
    expect(xml).toContain('https://docs.soroush.tech/design-system/')
    expect(xml).toContain('https://docs.soroush.tech/markdown/')
  })
})
