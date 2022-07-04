import * as fs from 'fs';
import { mkdir } from './mkdir';

export function copy(from: string, to: string): void {
  mkdir(to.split('/').slice(0, -1).join('/'));

  fs.copyFileSync(from, to);
}
