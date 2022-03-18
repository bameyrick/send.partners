import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { isNullOrUndefined } from '@qntm-code/utils';
import { Subscription } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Icon } from '../../enums';
import { IconPlacement } from '../../icon';

@Component({ template: '' })
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
   * Expose isNullOrUndefined helper to the view
   */
  public readonly isNullOrUndefined = isNullOrUndefined;

  /**
   * Subscriptions to unsubscribe from on destroy
   */
  protected readonly subscriptions: Subscription = new Subscription();

  constructor(public readonly elementRef: ElementRef) {}

  public ngOnInit(): void {
    this.initialClasses = (this.elementRef.nativeElement as HTMLElement).getAttribute('class');
    this.hostClass = this.getHostClass();
  }

  /**
   * Builds the string for the host class
   */
  protected getHostClass(): string {
    const hostClasses: string[] = [this.bemBlockClass];

    if (this.initialClasses) {
      hostClasses.push(this.initialClasses);
    }

    return hostClasses.join(' ');
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
