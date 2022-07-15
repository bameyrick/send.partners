import chalk from 'chalk';
import * as glob from 'glob';
import { ASSETS_DIR, HASHED_ASSETS_DIR } from '../directories';
import { rm } from '../rm';
import { mkdir } from '../mkdir';
import { AssetHasher } from './hash-asset';

async function hashAssets(): Promise<void> {
  console.log(chalk.blue('HASHING ASSETS'));

  rm(HASHED_ASSETS_DIR);
  mkdir(HASHED_ASSETS_DIR);

  const filePaths = glob.sync(`${ASSETS_DIR}/**/*.*`);

  const assetHasher = new AssetHasher();

  await Promise.all(filePaths.map(async file => assetHasher.hashAsset(file)));

  console.log(chalk.green('ASSETS HASHED'));
}

void hashAssets();
