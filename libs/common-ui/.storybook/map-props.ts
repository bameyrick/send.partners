import { parameters } from './preview.js';

export function mapComponentPropsForTemplate<T>(props: T): string {
  return `${Object.entries(props as unknown as Record<string, unknown>)
    .filter(([key]) => key !== 'content' && !parameters.controls.exclude.includes(key))
    .reduce((result, [key]) => `${result} [${key}]="${key}"`, '')}`;
}
