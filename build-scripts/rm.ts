import * as fs from 'fs';

export function rm(path: string): void {
  if (fs.existsSync(path)) {
    fs.rmSync(path, { recursive: true });
  }
}
