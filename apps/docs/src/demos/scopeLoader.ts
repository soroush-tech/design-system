/**
 * Loads the live-edit identifier scope on demand - the scope pulls in every
 * design-system component, so it stays out of the bundle until "Edit code" is clicked.
 */
export const loadDemoScope = () => import('./scope').then((module) => module.demoScope)
