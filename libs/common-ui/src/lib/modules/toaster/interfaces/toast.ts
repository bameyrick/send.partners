import { SafeHtml } from '@angular/platform-browser';
import { ToastOptions } from './toast-options';

export interface Toast {
  /**
   * Optional title for the toast
   */
  title?: string;

  /**
   * Body of the toast
   */
  body: string;

  /**
   * Optional options for the toast
   */
  options?: ToastOptions;
}

export interface ToastInternal extends Pick<Toast, 'title'> {
  id: string;
  body: SafeHtml;
  options: ToastOptions;
}
