import { test, expect } from '@playwright/test'

test.describe('design-system section', () => {
  test('overview renders the README with the sidebar nav', async ({ page }) => {
    await page.goto('/design-system/')
    await expect(page).toHaveTitle(/Design System · SOROUSH\.DESIGN/)
    await expect(page.getByRole('heading', { level: 1, name: 'Design System' })).toBeVisible()
    await expect(
      page.getByRole('navigation', { name: 'Design system documentation' })
    ).toBeVisible()
  })

  test('navbar shows the design-system version chip', async ({ page }) => {
    await page.goto('/design-system/')
    await expect(page.locator('header').getByText(/^v\d+\.\d+\.\d+$/)).toBeVisible()
  })

  test('sidebar navigates to installation', async ({ page }) => {
    await page.goto('/design-system/')
    await page
      .getByRole('navigation', { name: 'Design system documentation' })
      .getByRole('link', { name: 'Installation' })
      .click()
    await expect(page).toHaveURL(/\/design-system\/getting-started\/installation\//)
    await expect(page.getByRole('heading', { level: 1, name: 'Installation' })).toBeVisible()
  })

  test('components index lists categories and opens a component page', async ({ page }) => {
    await page.goto('/design-system/components/')
    await expect(page.getByRole('heading', { level: 1, name: 'Components' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Inputs & forms' })).toBeVisible()
    await page.getByRole('link', { name: 'Button', exact: true }).first().click()
    await expect(page).toHaveURL(/\/design-system\/components\/button\//)
    await expect(page.getByRole('heading', { level: 1, name: 'Button' })).toBeVisible()
  })

  test('the sidebar sits beside the content, not above it', async ({ page }) => {
    await page.goto('/design-system/components/button/')
    const nav = await page
      .getByRole('navigation', { name: 'Design system documentation' })
      .boundingBox()
    const heading = await page.getByRole('heading', { level: 1, name: 'Button' }).boundingBox()
    expect(nav && heading && heading.x > nav.x + nav.width).toBe(true)
  })

  test('a component page renders live demos with toggleable source', async ({ page }) => {
    await page.goto('/design-system/components/button/')
    await expect(page.getByRole('heading', { name: 'Variants' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Contained' }).first()).toBeVisible()
    // The collapsed preview snippet is visible before expanding; expand reveals imports.
    await expect(page.getByText('variant="contained"').first()).toBeVisible()
    await page.getByRole('button', { name: 'Expand code' }).first().click()
    await expect(page.getByText(/import \{ Button \}/).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Button API reference' })).toBeVisible()
  })

  test('a component page renders its README intro and every story as a demo', async ({ page }) => {
    await page.goto('/design-system/components/button-group/')
    await expect(page.getByRole('heading', { level: 1, name: 'ButtonGroup' })).toBeVisible()
    // The intro comes from the component's README, the demos from its stories file.
    await expect(page.getByText(/Groups related .*immediate children/)).toBeVisible()
    for (const story of ['Default', 'Variants', 'Sizes And Colors', 'Vertical']) {
      await expect(page.getByRole('heading', { name: story, exact: true })).toBeVisible()
    }
    // The collapsed preview snippet is visible without expanding.
    await expect(page.getByText("'aria-label': 'Basic button group'").first()).toBeVisible()
    await page.getByRole('button', { name: 'Expand code' }).first().click()
    // The typed synthesis imports the component together with its props type.
    await expect(
      page.getByText(/import \{ ButtonGroup, type ButtonGroupProps \}/).first()
    ).toBeVisible()
    await expect(page.getByRole('button', { name: 'Edit in CodeSandbox' }).first()).toBeVisible()
  })

  test('controls re-render the demo and rewrite its editable code', async ({ page }) => {
    await page.goto('/design-system/components/button-group/')
    const demo = page
      .locator('section')
      .filter({ has: page.getByRole('heading', { name: 'Default', exact: true }) })
    await demo.getByRole('button', { name: 'Controls' }).click()
    await demo.getByRole('combobox', { name: 'variant' }).selectOption('contained')
    await expect(demo.getByText("variant: 'contained'").first()).toBeVisible()
    // The TS view types the args const with the component's props type.
    await expect(demo.getByText(/Partial<ButtonGroupProps>/).first()).toBeVisible()
    // The JS view of an args-const preview transpiles per section - a regression here
    // crashes the page (the const and the JSX would parse as one expression).
    await demo.getByRole('button', { name: 'JS' }).click()
    await expect(demo.getByText("variant: 'contained'").first()).toBeVisible()
    await expect(demo.getByText(/Partial<ButtonGroupProps>/)).toHaveCount(0)
    await expect(demo.getByRole('button', { name: 'Reset demo' })).toBeVisible()
  })

  test('the JS toggle shows the example with its types stripped', async ({ page }) => {
    await page.goto('/design-system/components/button/')
    const demo = page
      .locator('section')
      .filter({ has: page.getByRole('heading', { name: 'Colors', exact: true }) })
    await expect(demo.getByText('as const').first()).toBeVisible()
    await demo.getByRole('button', { name: 'JS' }).click()
    await expect(demo.getByText('as const')).toHaveCount(0)
    await expect(demo.getByRole('button', { name: 'TS' })).toBeVisible()
  })

  test('the code is live-editable and reset restores the pristine demo', async ({ page }) => {
    await page.goto('/design-system/components/button/')
    const demo = page
      .locator('section')
      .filter({ has: page.getByRole('heading', { name: 'Variants', exact: true }) })
    // The code panel upgrades to the live editor once the runtime loads. Chrome gets
    // contenteditable="plaintext-only" from use-editable, so match loosely.
    const editor = demo.locator('[contenteditable]')
    await expect(editor).toBeVisible()
    // The live evaluation renders the same demo - and must not trip over the CSP
    // (live editing requires 'unsafe-eval').
    await expect(demo.getByRole('button', { name: 'Contained' })).toBeVisible()
    await expect(demo.getByText(/error/i)).toHaveCount(0)
    // A stray token at the top of the buffer surfaces a live evaluation error.
    await editor.click()
    await page.keyboard.press('Control+Home')
    await page.keyboard.type('<')
    await expect(demo.getByText(/error|unexpected/i).first()).toBeVisible()
    await demo.getByRole('button', { name: 'Reset demo' }).click()
    await expect(demo.getByText(/error|unexpected/i)).toHaveCount(0)
    await expect(demo.getByRole('button', { name: 'Contained' })).toBeVisible()
    // Expanding keeps the buffer editable, now with the full module visible.
    await demo.getByRole('button', { name: 'Expand code' }).click()
    await expect(demo.getByText(/import \{ Button \}/).first()).toBeVisible()
    await expect(editor).toBeVisible()
  })

  test('a component page without demos renders its README intro', async ({ page }) => {
    await page.goto('/design-system/components/quote/')
    await expect(page.getByRole('heading', { level: 1, name: 'Quote' })).toBeVisible()
    await expect(page.getByText(/blockquote/i).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Quote API reference' })).toBeVisible()
  })

  test('a component API page shows import, props reference, and source link', async ({ page }) => {
    await page.goto('/design-system/api/button/')
    await expect(page.getByRole('heading', { level: 1, name: 'Button API' })).toBeVisible()
    await expect(page.getByText(/import \{ Button \} from '@soroush\.tech/)).toBeVisible()
    await expect(page.getByRole('heading', { name: /Button-specific props/ })).toBeVisible()
    await expect(
      page.getByRole('link', { name: 'the implementation of the component' })
    ).toBeVisible()
  })

  test('customization pages render the package docs', async ({ page }) => {
    await page.goto('/design-system/customization/theming/')
    await expect(page.getByRole('heading', { level: 1, name: 'Theming' })).toBeVisible()
    await page.goto('/design-system/customization/how-to/')
    await expect(
      page.getByRole('heading', { level: 1, name: /Per-component customization/ })
    ).toBeVisible()
  })

  test('the API index links to the per-component API pages', async ({ page }) => {
    await page.goto('/design-system/api/')
    await expect(page.getByRole('heading', { level: 1, name: 'Component API' })).toBeVisible()
    await page.locator('main').getByRole('link', { name: 'ButtonGroup API', exact: true }).click()
    await expect(page).toHaveURL(/\/design-system\/api\/button-group\//)
    await expect(page.getByRole('heading', { level: 1, name: 'ButtonGroup API' })).toBeVisible()
  })
})
