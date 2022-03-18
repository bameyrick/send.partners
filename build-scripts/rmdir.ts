import * as fs from 'fs';

export function rmdir(path: string): void {
  if (fs.existsSync(path)) {
    fs.rmSync(path, { recursive: true });
  }
}
