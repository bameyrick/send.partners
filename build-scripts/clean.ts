import rimraf from 'rimraf';
import {
  COLOURS_ENUM_PATH,
  DIST_DIR,
  HASHED_ASSETS_DIR,
  HASHED_ASSETS_ENUM_PATH,
  HASHED_ASSETS_SCSS_PATH,
  ICONS_ENUM_PATH,
  SVG_RESULT_DIR,
  SVG_SYMBOLS_PATH,
} from './directories';

const directoriesToClean: string[] = [
  DIST_DIR,
  SVG_RESULT_DIR,
  SVG_SYMBOLS_PATH,
  HASHED_ASSETS_ENUM_PATH,
  COLOURS_ENUM_PATH,
  ICONS_ENUM_PATH,
  HASHED_ASSETS_DIR,
  HASHED_ASSETS_ENUM_PATH,
  HASHED_ASSETS_SCSS_PATH,
];

// eslint-disable-next-line @typescript-eslint/no-empty-function
directoriesToClean.forEach(dir => rimraf(dir, () => {}));
