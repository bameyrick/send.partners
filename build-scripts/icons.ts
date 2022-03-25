import chalk from 'chalk';
import * as glob from 'glob';
import * as fs from 'fs';
import * as svgo from 'svgo';
import SVGSpriter from 'svg-sprite';
import { Dictionary } from '@qntm-code/utils';
import { ASSETS_DIR, ENUMS_DIR, ICONS_ENUM_PATH, SVG_RESULT_DIR, SVG_SOURCE_DIR, SVG_SYMBOLS_PATH } from './directories';
import { AUTO_GENERATED_MESSAGE } from './auto-generated-message';
import { mkdir } from './mkdir';
import { removeParentUrlParts } from '../libs/common/src';
import { toEnumKey } from '../libs/common/src/lib/helpers/to-enum-key';

async function icons(): Promise<void> {
  console.log(chalk.blue('PROCESSING ICONS'));

  [ENUMS_DIR, SVG_RESULT_DIR].forEach(dir => mkdir(dir));

  const paths = glob.sync(`${SVG_SOURCE_DIR}/*.svg`);

  const svgoConfig = await svgo.loadConfig('svgo.config.json');

  let id: string;

  const spriter = new SVGSpriter({
    dest: ASSETS_DIR,
    log: 'info',
    shape: {
      id: {
        separator: '-',
        generator: () => id,
      },
      transform: [],
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false,
      namespaceIDs: false,
      namespaceClassnames: false,
      dimensionAttributes: false,
    },
    mode: {
      symbol: {
        sprite: `../${removeParentUrlParts(ASSETS_DIR, SVG_SYMBOLS_PATH)}`,
      },
    },
  });

  let enumFileContents: string = `${AUTO_GENERATED_MESSAGE}export enum Icon {`;

  paths.forEach(path => {
    const file = fs.readFileSync(path);
    const name = path.replace(SVG_SOURCE_DIR, '').slice(1);

    // Optimise
    const { data } = svgo.optimize(file, svgoConfig) as svgo.OptimizedSvg;
    const optimisedPath = `${SVG_RESULT_DIR}/${name}`;
    id = name.replace(/.svg$/, '');

    fs.writeFileSync(optimisedPath, data, 'utf8');

    spriter.add(optimisedPath, name, data);

    const key = toEnumKey(id);

    enumFileContents += `\n  ${key} = '${id}',`;
  });

  enumFileContents += `\n}\n`;

  fs.writeFileSync(ICONS_ENUM_PATH, enumFileContents, 'utf8');

  spriter.compile((_: unknown, result: Dictionary<Dictionary<Dictionary<string>>>) => {
    for (const mode in result) {
      for (const resource in result[mode]) {
        fs.writeFileSync(result[mode][resource]['path'], result[mode][resource]['contents']);
      }
    }
  });

  console.log(chalk.green('ICONS OPTIMISED AND SPRITE AND ENUM CREATED'));
}

void icons();
