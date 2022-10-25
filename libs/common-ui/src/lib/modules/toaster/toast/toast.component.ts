import { AfterContentInit, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { convertTimeUnit, TimeUnit } from '@qntm-code/utils';
import { filter, interval, map, Observable, share, takeWhile, tap } from 'rxjs';
import { AbstractComponent } from '../../../components';
import { ToastInternal } from '../interfaces/toast';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'common-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToastComponent extends AbstractComponent implements AfterContentInit {
  /**
   * The toast message to display
   */
  @Input() public toast!: ToastInternal;

  /**
   * Whether the mouse is over the toast
   */
  @Input() public mouseover = false;

  /**
   * The value to style the progress bar
   */
  public expiryProgress$?: Observable<string>;

  /**
   * The amount of time between progress updates
   */
  private readonly progressInterval = 10;

  constructor(elementRef: ElementRef, public readonly toasterService: ToasterService) {
    super(elementRef);
  }

  public ngAfterContentInit(): void {
    const { duration } = this.toast.options;

    if (duration) {
      const durationMilliseconds = convertTimeUnit(duration, TimeUnit.Seconds, TimeUnit.Milliseconds);

      let millisecondsRemaining = durationMilliseconds;

      const remaining$ = interval(this.progressInterval).pipe(
        takeWhile(() => millisecondsRemaining > 0),
        filter(() => !this.mouseover),
        tap(() => (millisecondsRemaining -= this.progressInterval)),
        map(() => millisecondsRemaining / durationMilliseconds),
        share()
      );

      this.subscriptions.add(remaining$.pipe(filter(value => value === 0)).subscribe(() => this.toasterService.removeToast(this.toast.id)));

      this.expiryProgress$ = remaining$.pipe(map(remaining => `${100 - remaining * 100}%`));
    }
  }

  protected override getHostClasses(): string[] {
    const classes = super.getHostClasses();

    if (this.toast?.options?.type) {
      classes.push(`${this.bemBlockClass}--${this.toast.options.type}`);
    }

    return classes;
  }
}
