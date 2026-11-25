# TabContext

Holds the selected value for a `TabList` and the `TabPanel`s beside it, wherever they sit - the
tabs in a toolbar, the panels further down the page. It renders nothing of its own.

```tsx
<TabContext defaultValue="layers">
  <TabList aria-label="Left panel">
    <Tab value="layers" label="Layers" />
    <Tab value="assets" label="Assets" />
  </TabList>
  <TabPanel value="layers">...</TabPanel>
  <TabPanel value="assets">...</TabPanel>
</TabContext>
```

## Props

| Prop           | Type                                | Default | Description                                           |
| -------------- | ----------------------------------- | ------- | ----------------------------------------------------- |
| `value`        | `string \| number \| null`          | -       | The selected tab's value. Controlled with `onChange`. |
| `defaultValue` | `string \| number \| null`          | `null`  | The selected tab's value at first.                    |
| `onChange`     | `(value: string \| number) => void` | -       | Fired with a tab's value when it is chosen.           |
