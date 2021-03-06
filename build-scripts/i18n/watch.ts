import chalk from 'chalk';
import * as chokidar from 'chokidar';
import * as path from 'path';

import { HASHED_ASSETS_DIR, I18N_RESULT_DIR } from '../directories';
import { rm } from '../rm';
import { copyI18n } from './copy';

console.log(chalk.blue('WATCHING TRANSLATIONS'));

const watcher = chokidar.watch('+(i18n)**/*.i18n.json', {
  ignored: [I18N_RESULT_DIR, `${HASHED_ASSETS_DIR}/i18n`],
  ignoreInitial: true,
});

watcher.on('add', file => copyI18n(file));
watcher.on('change', file => copyI18n(file));
watcher.on('unlink', file => {
  const counterpart = `${I18N_RESULT_DIR}/${path.basename(file)}`;

  rm(counterpart);

  console.log(chalk.red(`Removed ${counterpart}`));
});
