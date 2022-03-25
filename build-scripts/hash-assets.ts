import * as glob from 'glob';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import * as crypto from 'crypto';
import { Dictionary } from '@qntm-code/utils';
import { ASSETS_DIR, HASHED_ASSETS_DIR, HASHED_ASSETS_ENUM_PATH, HASHED_ASSETS_SCSS_PATH } from './directories';
import { AUTO_GENERATED_MESSAGE } from './auto-generated-message';
import { mkdir } from './mkdir';
import { rmdir } from './rmdir';

/**
 * Copies assets from the ASSETS_DIR to HASHED_ASSETS_DIR and creates a typescript enum file and scss variables file to map the
 * hashed file names. This enables cache busting based on file contents.
 */
function hashAssets(): void {
  console.log(chalk.blue('HASHING ASSETS'));

  const filePaths = glob.sync(`${ASSETS_DIR}/**/*.*`);

  /**
   * The map used to copy files from their original assets folder to the hashed one
   */
  const copyMap: Dictionary<string> = {};

  /**
   * The map used to create a path dictionary for typescript usage and a variable file for sass usage.
   */
  const pathMap: Dictionary<string> = {};

  filePaths.map(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const hash = generateHash(content);

    const fileExtention = path.extname(filePath);

    const hashedFilePath = filePath
      .replace(`${ASSETS_DIR}/`, `${HASHED_ASSETS_DIR}/`)
      .replace(new RegExp(`${fileExtention}$`), `.${hash}${fileExtention}`);

    copyMap[filePath] = hashedFilePath;

    pathMap[filePath.replace(new RegExp(`^${ASSETS_DIR}/`), '')] = hashedFilePath.replace(new RegExp(`^${HASHED_ASSETS_DIR}`), 'assets');
  });

  let tsFileContents = `${AUTO_GENERATED_MESSAGE}export enum AssetPath {`;
  let scssFileContents = AUTO_GENERATED_MESSAGE;

  Object.entries(pathMap).forEach(([key, value]) => {
    scssFileContents += `$${key.replace(/\//g, '-').replace(/\./g, '-').toLowerCase()}: '${value}';\n`;
    tsFileContents += `\n  '${key}' = '${value}',`;
  });

  tsFileContents += `\n}\n`;

  fs.writeFileSync(HASHED_ASSETS_ENUM_PATH, tsFileContents, 'utf8');
  fs.writeFileSync(HASHED_ASSETS_SCSS_PATH, scssFileContents, 'utf8');

  copyDirectoryStructure(ASSETS_DIR, HASHED_ASSETS_DIR);

  Object.entries(copyMap).map(([from, to]) => fs.copyFileSync(from, to));

  console.log(chalk.green('ASSETS HASHED'));
}

void hashAssets();

function copyDirectoryStructure(fromPath: string, toPath: string): void {
  rmdir(toPath);

  mkdir(toPath);

  const directories = glob.sync(`${fromPath}/**/`);

  directories.map(directory => mkdir(directory.replace(fromPath, toPath)));
}

/**
 * Generates a hash based on the file content
 */
function generateHash(fileContent: string): string {
  const hash = crypto.createHash('md5');
  hash.update(fileContent);

  return hash.digest('hex');
}
