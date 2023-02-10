import { Component, forwardRef, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Dictionary } from '@qntm-code/utils';
import { Icon } from '../../enums';
import { didChange } from '../../helpers';
import { AbstractTextInputComponent } from '../abstracts';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent extends AbstractTextInputComponent implements OnChanges {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'TextInput';

  /**
   * The type of the input
   */
  @Input() public type: 'text' | 'email' | 'password' | 'search' | 'tel' = 'text';

  /**
   * Whether to show a loading spinner
   */
  @Input() public loading = false;

  /**
   * The input type, this can be toggled (for passwords)
   */
  public inputType = this.type;

  public override ngOnChanges(changes: SimpleChanges): void {
    this.setIcon();

    super.ngOnChanges(changes);

    if (didChange(changes['type'])) {
      this.inputType = this.type;
    }
  }

  /**
   * Changes the input type
   */
  public toggleInputType(): void {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }

  /**
   * Gets css classes for the control
   */
  protected override getInputClasses(): Dictionary<boolean> {
    const classes: Dictionary<boolean> = super.getInputClasses();

    classes[`Input--with-icon`] = !!this.icon || this.type === 'password';

    return classes;
  }

  /**
   * Sets the field icon depending on the input type / whether its loading
   */
  private setIcon(): void {
    this.icon = null;

    if (this.type === 'search') {
      this.icon = Icon.Search;
    }

    if (this.loading) {
      this.icon = Icon.Spinner;
    }
  }

  protected override getIconClasses(): string[] {
    const classes = super.getIconClasses();

    if (this.loading) {
      classes.push('Field__icon--spin');
    }

    return classes;
  }
}
