import * as fs from 'fs';

export function mkdir(path: string): void {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}
