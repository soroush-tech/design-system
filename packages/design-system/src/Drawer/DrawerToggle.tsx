import { Button, type ButtonProps } from '../Button'

export interface DrawerToggleProps extends Omit<ButtonProps, 'href'> {
  /** The `id` of the `Drawer` this button opens and closes. */
  drawer: string
  /** What a click does to the drawer. Default: 'toggle'. */
  action?: 'toggle' | 'show' | 'hide'
}

/**
 * @description The button that opens and closes a `Drawer`, through the HTML
 * `popovertarget` attribute - it works without JavaScript. Takes every `Button` prop.
 */
export function DrawerToggle({ drawer, action = 'toggle', ...rest }: Readonly<DrawerToggleProps>) {
  return <Button popoverTarget={drawer} popoverTargetAction={action} {...rest} />
}
