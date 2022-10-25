import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { v4 as UUID } from 'uuid';
import { Position } from '../../enums';
import { TranslateService } from '../../translate';
import { Toast, ToasterConfig } from './interfaces';
import { ToastInternal } from './interfaces/toast';

export const TOASTER_CONFIG = new InjectionToken<ToasterConfig>('TOASTER_CONFIG');

interface ToasterConfigInternal extends Partial<ToasterConfig> {
  position: Position;
  autoDismiss: boolean;
  duration: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  /**
   * The toasts that should currently be shown
   */
  public readonly activeToasts$ = new BehaviorSubject<ToastInternal[]>([]);

  /**
   * Config options for the toaster
   */
  public readonly config: ToasterConfigInternal;

  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly translateService: TranslateService,
    @Optional() @Inject(TOASTER_CONFIG) options: ToasterConfig
  ) {
    this.config = {
      position: Position.BottomRight,
      autoDismiss: true,
      duration: 10,
      ...options,
    };
  }

  public async pop({ title, body, options }: Toast): Promise<void> {
    this.activeToasts$.next([
      {
        id: UUID(),
        title,
        body,
        options: {
          ...options,
          duration: options?.duration ?? this.config.duration,
        },
      },
      ...(await firstValueFrom(this.activeToasts$)),
    ]);
  }

  /**
   * Removes a given toast
   */
  public async removeToast(id: string): Promise<void> {
    this.activeToasts$.next((await firstValueFrom(this.activeToasts$)).filter(toast => toast.id !== id));
  }
}
