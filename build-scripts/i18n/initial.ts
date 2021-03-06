import chalk from 'chalk';
import * as glob from 'glob';

import { HASHED_ASSETS_DIR, I18N_RESULT_DIR } from '../directories';
import { copyI18n } from './copy';
import { rm } from '../rm';

async function findTranslationFiles(): Promise<void> {
  console.log(chalk.blue('COPYING TRANSLATIONS'));

  rm(I18N_RESULT_DIR);

  const files = glob.sync(`./**/*.i18n.json`, { ignore: [I18N_RESULT_DIR, `${HASHED_ASSETS_DIR}/i18n`] });

  await Promise.all(files.map(file => copyI18n(file)));

  console.log(chalk.green('TRANSLATIONS COPIED'));
}

void findTranslationFiles();
