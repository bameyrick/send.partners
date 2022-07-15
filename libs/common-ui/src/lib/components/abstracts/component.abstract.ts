import { Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { isEmpty, isNullOrUndefined } from '@qntm-code/utils';
import { getRouterLinkForAppPath } from '@app/common';
import { Subscription } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Icon } from '../../enums';
import { IconPlacement } from '../../icon';
import { PanelType } from '../panel';

@Directive()
export abstract class AbstractComponent implements OnInit, OnDestroy {
  /**
   * Classes for the host element
   */
  @HostBinding('class') protected hostClass?: string;

  /**
   * The host element element's id
   */
  @HostBinding('id') @Input() public id: string = uuid();

  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = this.constructor.name.replace('Component', '');

  /**
   * Cache the initial host element classes
   */
  private initialClasses?: string | null;

  /**
   * Expose Icon enum to the view
   */
  public readonly Icon = Icon;

  /**
   * Expose IconPlacement enum to the view
   */
  public readonly IconPlacement = IconPlacement;

  /**
   * Expose the PanelType enum to the view
   */
  public readonly PanelType = PanelType;

  /**
   * Expose isNullOrUndefined helper to the view
   */
  public readonly isNullOrUndefined = isNullOrUndefined;

  /**
   * Expose isEmpty helper to the view
   */
  public readonly isEmpty = isEmpty;

  /**
   * Expose getRouterLinkForAppPath helper to the view
   */
  public readonly getRouterLinkForAppPath = getRouterLinkForAppPath;

  /**
   * Reference to the native element
   */
  protected readonly nativeElement = this.elementRef.nativeElement as HTMLElement;

  /**
   * Subscriptions to unsubscribe from on destroy
   */
  protected readonly subscriptions: Subscription = new Subscription();

  constructor(protected readonly elementRef: ElementRef) {}

  public ngOnInit(): void {
    this.initialClasses = (this.nativeElement as HTMLElement).getAttribute('class');

    this.setHostClass();
  }

  protected setHostClass(): void {
    this.hostClass = this.getHostClasses().join(' ');
  }

  /**
   * Builds the string for the host class
   */
  protected getHostClasses(): string[] {
    const hostClasses: string[] = [this.bemBlockClass];

    if (this.initialClasses) {
      hostClasses.push(this.initialClasses);
    }

    return hostClasses;
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
