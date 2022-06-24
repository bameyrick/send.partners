import chalk from 'chalk';
import * as chokidar from 'chokidar';

import { ASSETS_DIR } from '../directories';
import { AssetHasher } from './hash-asset';

console.log(chalk.blue('WATCHING ASSETS'));

const assetHasher = new AssetHasher();

const watcher = chokidar.watch(ASSETS_DIR, {
  ignored: /(^|[\/\\])\../,
});

watcher.on('add', file => assetHasher.hashAsset(file));
watcher.on('change', file => assetHasher.hashAsset(file));
watcher.on('unlink', file => assetHasher.removeAsset(file));
