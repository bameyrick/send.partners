import { Position } from '../../../enums';
import { CommonToastOptions } from './common-toast-options';

export interface ToasterConfig extends CommonToastOptions {
  /**
   * Where the toasts should be placed
   */
  position?: Position;
}
