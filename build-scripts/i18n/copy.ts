import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';

import { I18N_RESULT_DIR } from '../directories';
import { mkdir } from '../mkdir';

export async function copyI18n(file: string): Promise<void> {
  if (!fs.existsSync(I18N_RESULT_DIR)) {
    mkdir(I18N_RESULT_DIR);
  }

  const destination = `${I18N_RESULT_DIR}/${path.basename(file)}`;

  fs.copyFileSync(file, destination);

  console.log(`${chalk.blue(`Copied`)} ${chalk.cyanBright(file)} ${chalk.blue(`to`)} ${chalk.cyanBright(destination)}`);
}
