# TabList

The `Tabs` of a `TabContext`: it shows the context's value and chooses through it, and links each
tab to its `TabPanel` - the tab `aria-controls` its panel, and the panel is named by its tab.

```tsx
import { Tab, TabContext, TabList, TabPanel } from '@soroush.tech/design-system/Tabs'

const [value, setValue] = useState('1')

;<TabContext value={value}>
  <TabList onChange={setValue} aria-label="Item tabs">
    <Tab label="Item One" value="1" />
    <Tab label="Item Two" value="2" />
  </TabList>
  <TabPanel value="1" shouldKeepMounted>
    ...
  </TabPanel>
  <TabPanel value="2" shouldKeepMounted>
    ...
  </TabPanel>
</TabContext>
```

## Props

Every `Tabs` prop but `value` and `defaultValue`, which are the `TabContext`'s. `onChange` fires
with the chosen tab's value, after the `TabContext` has taken it.

A `Tabs` on its own holds or takes its own value and points at no panel; a `TabList` is how tabs
join a `TabContext`.
