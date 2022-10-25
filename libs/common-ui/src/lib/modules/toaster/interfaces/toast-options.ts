import { Icon } from '../../../enums';
import { CommonToastOptions } from './common-toast-options';

export interface ToastOptions extends CommonToastOptions {
  /**
   * Will add a BEM modifier to the toast element with the type for styling purposes
   */
  type?: string;

  /**
   * Optional icon to show in the toast
   */
  icon?: Icon;
}
