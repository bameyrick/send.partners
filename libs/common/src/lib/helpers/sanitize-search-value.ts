import { isEmpty } from '@qntm-code/utils';

/**
 * Sanitizes a search value to be used in a filter or similarity score function
 */
export function sanitizeSearchValue(value: string | undefined): string {
  if (isEmpty(value)) {
    return '';
  }

  return value.trim().replace(/\s\s+/g, ' ').toLowerCase();
}
