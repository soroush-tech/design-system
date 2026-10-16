# Breakpoints

`theme.breakpoints` decides where responsive values change. Every responsive prop, and every
array in `css()`, turns its values into media queries from this one scale.

## A list or named breakpoints

The scale is either an ascending list or named breakpoints, in the order you declare them.

```js
// a list - array values map by position
breakpoints: ['40em', '52em', '64em']

// named - object values map by name, array values by declared order
breakpoints: { tablet: '37.5em', web: '75em', wide: '100em' }
```

The two value forms work with either scale:

```jsx
<Box p={[2, 3, 4]} />           // base, then the first and second breakpoint
<Box p={{ _: 2, web: 4 }} />    // `_` is the base value; keys name breakpoints
```

With a list, object keys are indexes (`{ _: 2, 1: 4 }`). Keep named breakpoints in ascending
order, because array values take them in declared order. Names must not look like integers
(`'600'`): JavaScript moves integer-like keys to the front of an object.

## What a breakpoint value can be

| Value                                                   | Media query                                 |
| ------------------------------------------------------- | ------------------------------------------- |
| a length: `'40em'`, `'600px'`, `'calc(...)'`            | `@media screen and (min-width: 40em)`       |
| a number: `768`                                         | `@media screen and (min-width: 768px)`      |
| a condition: `'(orientation: landscape)'`               | `@media (orientation: landscape)`           |
| a range: `'(600px <= width < 1200px)'`                  | `@media (600px <= width < 1200px)`          |
| a media type or list: `'print'`, `'not (hover: hover)'` | `@media print`, `@media not (hover: hover)` |
| a full rule: `'@media screen and (max-width: 20em)'`    | used as written                             |

A length keeps the mobile-first meaning: from this width up. A condition or a full rule
applies only where it matches, so a range breakpoint styles one band of widths and nothing
above it.

`createMediaQuery(value)` returns this rule for one value, and `breakpointQueries(breakpoints)`
returns `[name, rule]` pairs in declared order, for components that write their own media
blocks.

## Units: em and rem use the browser's font size

Inside a media query, `em` and `rem` are relative to the browser's **initial** font size (16px
unless the user changed it), not to the root element's font size. `html { font-size: 62.5% }`
does not move a breakpoint; `40em` stays 640px. A user who raises the browser's default font size
moves every em breakpoint with it, so the layout switches at the same amount of text per line.
That is the reason to prefer `em` for breakpoints. `px` breakpoints ignore the user's font size.

Viewport units are no use in a width query: `50vw` measures the very viewport being tested. A
media query can't read custom properties either, so `var(--x)` is not a breakpoint.

## The order media blocks are written in

Responsive styles are written base first, then one `@media` block per breakpoint in declared
order. Later blocks win where two match, so with min-width lengths the largest matching
breakpoint wins, as mobile-first expects. With conditions or ranges, declared order is the
tie-breaker: declare the broader condition first.

## Container queries

A breakpoint answers to the viewport. A component that should respond to its own container's
width needs a container query (`@container (min-width: ...)`), which this scale does not produce
yet. Write those in your styles directly until then.
