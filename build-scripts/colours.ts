import chalk from 'chalk';
import * as fs from 'fs';
import { isEmpty } from '@qntm-code/utils';
import { COLOURS_ENUM_PATH, COLOURS_SCSS_DIR, ENUMS_DIR } from './directories';
import { AUTO_GENERATED_MESSAGE } from './auto-generated-message';

async function colours(): Promise<void> {
  console.log(chalk.blue('CREATING COLOURS ENUM'));

  [ENUMS_DIR].forEach(dir => fs.mkdirSync(dir, { recursive: true }));

  let enumFileContents: string = `${AUTO_GENERATED_MESSAGE}export enum Colour {`;

  const scssColours = fs
    .readFileSync(COLOURS_SCSS_DIR, 'utf-8')
    .split('\n')
    .filter(item => !isEmpty(item) && !/^\/\//.test(item))
    .map(item => {
      const [key, colour] = item.split(':');

      return {
        key: key.trim(),
        colour: colour.replace(';', '').trim(),
      };
    });

  scssColours.forEach(({ key, colour }) => {
    key = key.replace('$colour-', '').trim();

    if (key.includes('-')) {
      key = `['${key}']`;
    }

    if (!colour.includes('#')) {
      colour = scssColours.find(c => c.key === colour)!.colour;
    }

    enumFileContents += `\n  ${key} = '${colour}',`;
  });

  enumFileContents += `\n}\n`;

  fs.writeFileSync(COLOURS_ENUM_PATH, enumFileContents, 'utf8');

  console.log(chalk.green('COLOURS ENUM CREATED'));
}

void colours();
