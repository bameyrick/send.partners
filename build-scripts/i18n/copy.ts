import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';

import { I18N_RESULT_DIR } from '../directories';

export async function copyI18n(file: string): Promise<void> {
  if (!fs.existsSync(I18N_RESULT_DIR)) {
    fs.mkdirSync(I18N_RESULT_DIR, { recursive: true });
  }

  const filename = path.basename(file);
  const language = path.basename(file.replace(filename, ''));

  const destination = `${I18N_RESULT_DIR}/${language}.${filename}`;

  fs.copyFileSync(file, destination);

  console.log(`${chalk.blue('Copied')} ${chalk.cyanBright(file)} ${chalk.blue('to')} ${chalk.cyanBright(destination)}`);
}
