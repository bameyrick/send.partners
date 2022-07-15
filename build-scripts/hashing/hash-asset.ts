import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import chalk from 'chalk';
import { ASSETS_DIR, HASHED_ASSETS_DIR, HASHED_ASSETS_ENUM_PATH, HASHED_ASSETS_SCSS_PATH } from '../directories';
import { Dictionary } from '@qntm-code/utils';
import { rm } from '../rm';
import { AUTO_GENERATED_MESSAGE } from '../auto-generated-message';
import { copy } from '../copy';
import { debounceTime, Subject } from 'rxjs';

export class AssetHasher {
  private readonly copyMap: Dictionary<string> = {};
  private readonly pathMap: Dictionary<string> = {};

  private readonly regenerateFileSubject$ = new Subject<void>();

  constructor() {
    this.regenerateFileSubject$.pipe(debounceTime(50)).subscribe(() => this.createSCSSAndTS());
  }

  public async hashAsset(filePath: string): Promise<void> {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileExtention = path.extname(filePath);
    const hash = this.generateHash(content);

    const hashedFilePath = filePath
      .replace(`${ASSETS_DIR}/`, `${HASHED_ASSETS_DIR}/`)
      .replace(new RegExp(`${fileExtention}$`), `.${hash}${fileExtention}`);

    if (this.copyMap[filePath]) {
      rm(this.copyMap[filePath]);
    }

    this.copyMap[filePath] = hashedFilePath;

    this.pathMap[this.getAssetPath(filePath)] = hashedFilePath.replace(new RegExp(`^${HASHED_ASSETS_DIR}`), 'assets');

    copy(filePath, hashedFilePath);

    this.regenerateFileSubject$.next();

    console.log(chalk.cyanBright(`${filePath} hashed`));
  }

  public async removeAsset(filePath: string): Promise<void> {
    if (this.copyMap[filePath]) {
      rm(this.copyMap[filePath]);

      delete this.copyMap[filePath];

      console.log(chalk.red(`Removed hashed file for ${filePath}`));
    }

    const assetPath = this.getAssetPath(filePath);

    if (this.pathMap[assetPath]) {
      delete this.pathMap[assetPath];

      this.regenerateFileSubject$.next();
    }
  }

  private createSCSSAndTS(): void {
    let tsFileContents = `${AUTO_GENERATED_MESSAGE}export enum AssetPath {`;
    let scssFileContents = AUTO_GENERATED_MESSAGE;

    Object.entries(this.pathMap).forEach(([key, value]) => {
      scssFileContents += `$${key.replace(/\//g, '-').replace(/\./g, '-').toLowerCase()}: '/${value}';\n`;
      tsFileContents += `\n  '${key}' = '${value}',`;
    });

    tsFileContents += `\n}\n`;

    fs.writeFileSync(HASHED_ASSETS_ENUM_PATH, tsFileContents, 'utf8');
    fs.writeFileSync(HASHED_ASSETS_SCSS_PATH, scssFileContents, 'utf8');

    console.log(chalk.green(`Hash TS enum and SCSS variables updated`));
  }

  private getAssetPath(filePath: string): string {
    return filePath.replace(new RegExp(`^${ASSETS_DIR}/`), '');
  }

  /**
   * Generates a hash based on the file content
   */
  private generateHash(fileContent: string): string {
    const hash = crypto.createHash('md5');
    hash.update(fileContent);

    return hash.digest('hex');
  }
}
