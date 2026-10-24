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

  test('the search is a page of its own: important links first, matches once a word is typed', async ({
    page,
  }) => {
    await page.goto('/design-system/')
    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('button', { name: 'Search' })
      .click()
    const search = page.getByRole('dialog', { name: 'Search the documentation' })
    await expect(search.getByRole('heading', { name: 'Most important links' })).toBeVisible()
    await expect(search.getByRole('link', { name: /Installation/ })).toBeVisible()
    await search.getByRole('searchbox').fill('autocomplete')
    await search
      .getByRole('link', { name: /^Autocomplete/ })
      .first()
      .click()
    await expect(page).toHaveURL(/\/design-system\/components\/autocomplete\//)
    // The search it led from is kept for next time.
    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('button', { name: 'Search' })
      .click()
    await expect(
      page.getByRole('dialog', { name: 'Search the documentation' }).getByRole('button', {
        name: 'autocomplete',
      })
    ).toBeVisible()
  })

  test('the rail shows the version of the docs under the search', async ({ page }) => {
    await page.goto('/design-system/')
    const rail = page.getByRole('navigation', { name: 'Primary' })
    await expect(rail.getByRole('button', { name: 'Search' })).toBeVisible()
    await expect(
      rail.getByRole('button', { name: /Documentation version, v\d+\.\d+\.\d+/ })
    ).toBeVisible()
  })

  test('the version menu lists the released versions and opens the one that is chosen', async ({
    page,
  }) => {
    // The deploy writes /versions.json at the domain root; a local build has none, so it is given.
    await page.route('**/versions.json', (route) =>
      route.fulfill({ json: { 'design-system': ['1.3.3'] } })
    )
    // A snapshot is a build of its own, so its page is given too.
    await page.route('**/design-system/1.3.3/', (route) =>
      route.fulfill({ contentType: 'text/html', body: '<title>1.3.3 snapshot</title>' })
    )
    await page.goto('/design-system/')
    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('button', { name: /Documentation version/ })
      .click()
    const menu = page.getByRole('menu', { name: 'Documentation version' })
    await expect(menu.getByRole('menuitemradio', { name: /^Latest/ })).toHaveAttribute(
      'aria-checked',
      'true'
    )
    await menu.getByRole('menuitemradio', { name: 'v1.3.3' }).click()
    await expect(page).toHaveURL(/\/design-system\/1\.3\.3\/$/)
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
    const tabs = page.getByRole('navigation', { name: 'Button pages' })
    await expect(tabs.getByRole('link', { name: 'Overview' })).toHaveAttribute(
      'aria-current',
      'page'
    )
    await expect(tabs.getByRole('link', { name: 'Specs' })).toBeVisible()
  })

  test('a wide window lists the sections of the page in a contents column', async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 900 })
    await page.goto('/design-system/api/button/')
    const toc = page.getByRole('navigation', { name: 'On this page' })
    await expect(toc.getByRole('link', { name: 'Button-specific props' })).toBeVisible()
    await toc.getByRole('link', { name: 'Styled-system props' }).click()
    await expect(page).toHaveURL(/#styled-system-props$/)
  })

  test('a component with accessibility notes has the tab, and the notes are only there', async ({
    page,
  }) => {
    await page.goto('/design-system/components/fab/')
    const tabs = page.getByRole('navigation', { name: 'Fab pages' })
    // The notes are not under Overview...
    await expect(page.getByRole('heading', { level: 2, name: 'Accessibility' })).toHaveCount(0)
    await tabs.getByRole('link', { name: 'Accessibility' }).click()
    await expect(page).toHaveURL(/\/design-system\/components\/fab\/accessibility\//)
    // ...they are on their own tab.
    await expect(page.getByRole('heading', { level: 2, name: 'Accessibility' })).toBeVisible()
    await expect(tabs.getByRole('link', { name: 'Accessibility' })).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  test('a component without accessibility notes has no such tab', async ({ page }) => {
    await page.goto('/design-system/components/quote/')
    const tabs = page.getByRole('navigation', { name: 'Quote pages' })
    await expect(tabs.getByRole('link', { name: 'Specs' })).toBeVisible()
    await expect(tabs.getByRole('link', { name: 'Accessibility' })).toHaveCount(0)
  })

  test('a component page renders its README intro and every story as a demo', async ({ page }) => {
    await page.goto('/design-system/components/button-group/')
    await expect(page.getByRole('heading', { level: 1, name: 'ButtonGroup' })).toBeVisible()
    // The intro comes from the component's README, the demos from its stories file.
    await expect(page.getByText(/Groups related .*immediate children/).first()).toBeVisible()
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
  })

  test('a component specs page shows import, props reference, and source link', async ({
    page,
  }) => {
    await page.goto('/design-system/api/button/')
    await expect(page.getByRole('heading', { level: 1, name: 'Button' })).toBeVisible()
    await expect(
      page.getByRole('navigation', { name: 'Button pages' }).getByRole('link', { name: 'Specs' })
    ).toHaveAttribute('aria-current', 'page')
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
    await expect(page.getByRole('heading', { level: 1, name: 'ButtonGroup' })).toBeVisible()
  })
})
