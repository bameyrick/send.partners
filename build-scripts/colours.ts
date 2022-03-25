import chalk from 'chalk';
import * as fs from 'fs';
import { isEmpty } from '@qntm-code/utils';
import { COLOURS_ENUM_PATH, COLOURS_SCSS_DIR, ENUMS_DIR } from './directories';
import { mkdir } from './mkdir';
import { AUTO_GENERATED_MESSAGE } from './auto-generated-message';

async function colours(): Promise<void> {
  console.log(chalk.blue('CREATING COLOURS ENUM'));

  [ENUMS_DIR].forEach(dir => mkdir(dir));

  let enumFileContents: string = `${AUTO_GENERATED_MESSAGE}export enum Colour {`;

  fs.readFileSync(COLOURS_SCSS_DIR, 'utf-8')
    .split('\n')
    .filter(item => !isEmpty(item))
    .forEach(item => {
      let [key, colour] = item.split(':');

      key = key.replace('$colour-', '').trim();

      if (key.includes('-')) {
        key = `['${key}']`;
      }

      enumFileContents += `\n  ${key} = '${colour.replace(';', '').trim()}',`;
    });

  enumFileContents += `\n}\n`;

  fs.writeFileSync(COLOURS_ENUM_PATH, enumFileContents, 'utf8');

  console.log(chalk.green('COLOURS ENUM CREATED'));
}

void colours();
