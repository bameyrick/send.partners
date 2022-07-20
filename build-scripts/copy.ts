import * as fs from 'fs';

export function copy(from: string, to: string): void {
  fs.mkdirSync(to.split('/').slice(0, -1).join('/'), { recursive: true });

  fs.copyFileSync(from, to);
}
