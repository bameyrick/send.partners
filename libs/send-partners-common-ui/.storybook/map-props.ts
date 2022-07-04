import { parameters } from './preview.js';

export function mapComponentPropsForTemplate<T>(props: T): string {
  return `${Object.entries(props)
    .filter(([key]) => key !== 'content' && !parameters.controls.exclude.includes(key))
    .reduce((result, [key]) => `${result} [${key}]="${key}"`, '')}`;
}
