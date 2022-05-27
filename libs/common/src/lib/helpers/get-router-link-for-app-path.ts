import { Dictionary } from '@qntm-code/utils';

export function getRouterLinkForAppPath(path: string, params?: Dictionary<string | number | boolean>): string {
  let newPath = `/${path}`;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (newPath.includes(`/:${key}`)) {
        newPath = newPath.replace(new RegExp(`/:${key}`), `/${value}`);
      } else {
        throw new Error(`Paramater "${key}" does not exist in the path "${path}"`);
      }
    });
  }

  return newPath;
}
