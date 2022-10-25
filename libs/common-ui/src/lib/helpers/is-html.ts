/**
 * Checks if a string contains HTML elements
 */
export function isHTML(str: string): boolean {
  const doc = new DOMParser().parseFromString(str, 'text/html');

  return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
}
