import { Component, ElementRef, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors } from '@angular/forms';
import { Dictionary } from '@qntm-code/utils';
import { debounceTime, Subject } from 'rxjs';
import { AbstractComponent } from './component.abstract';

@Component({ template: '' })
export abstract class AbstractControlComponent<ValueType> extends AbstractComponent implements ControlValueAccessor, OnInit, OnChanges {
  /**
   * The input element's label
   */
  @Input() public label?: string;

  /**
   * The input element's name attribute
   */
  @Input() public name?: string;

  /**
   * The input element's autocomplete attribute
   */
  @Input() public autocomplete = 'off';

  /**
   * Optional input classes to apply to the actual html input element
   */
  @Input() public inputClass?: string;

  /**
   * Emits an event on form field focus
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public focus = new EventEmitter<FocusEvent>();

  /**
   * Emits an event on form field blur
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public blur = new EventEmitter<FocusEvent>();

  /**
   * Emits an event on enter key
   */
  @Output() public enter = new EventEmitter<Event>();

  /**
   * The current control value
   */
  public value?: ValueType | null;

  /**
   * The form control for this custom input
   */
  public control: NgControl | null = null;

  /**
   * The control's valid state
   */
  public valid = true;

  /**
   * The control's invalid state
   */
  public invalid = false;

  /**
   * Gets the control's pending state
   */
  public pending = false;

  /**
   * Gets the control's pristine state
   */
  public pristine = true;

  /**
   * Gets the control's untouched state
   */
  public untouched = true;

  /**
   * Gets the control's touched state
   */
  public touched = false;

  /**
   * Gets the control's dirty state
   */
  public dirty = false;

  /**
   * Whether the control currently has focus
   */
  public focused = false;

  /**
   * Validation errors for this control
   */
  public errors: ValidationErrors = {};

  /**
   *  The controls input classes
   */
  public inputClasses: Dictionary<boolean> = this.getInputClasses();

  /**
   * The registered on change function
   */
  private _onChange?: (value?: ValueType | null) => void;

  /**
   * The registered on touch function
   */
  private _onTouched?: () => void;

  /**
   * Cache for the disabled state
   */
  private _disabled = false;

  /**
   * Cache for the readonly state
   */
  private _readonly = false;

  /**
   * Cache for the required state
   */
  private _required = false;

  /**
   * Sets the disabled state
   */
  @Input() public set disabled(disabled: boolean) {
    this._disabled = disabled;
  }

  /**
   * Gets the disabled state
   */
  public get disabled(): boolean {
    return this._disabled;
  }

  /**
   * Sets the readonly state
   */
  @Input() public set readonly(readonly: boolean) {
    this._readonly = readonly;
  }

  /**
   * Gets the readonly state
   */
  public get readonly(): boolean {
    return this._readonly;
  }

  /**
   * Sets the readonly state
   */
  @Input() public set required(required: boolean) {
    this._required = required;
  }

  /**
   * Gets the required state
   */
  public get required(): boolean {
    return this._required;
  }

  /**
   * A subject to debounce the set state function
   */
  protected readonly setStateQueue$ = new Subject<void>();

  constructor(elementRef: ElementRef, protected readonly injector: Injector) {
    super(elementRef);

    /**
     * The debounce is used to ensure that injected abstract controls or related abstract controls have a change to update their state
     * before we calculate our own state based on the state of those controls. This helps to prevent false validation errors.
     */
    this.setStateQueue$.pipe(debounceTime(0)).subscribe(() => this.setState());
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this.control = this.injector.get<NgControl | null>(NgControl, null);
  }

  public ngOnChanges(_changes: SimpleChanges): void {
    this.setStateQueue$.next();
  }

  public writeValue(value?: ValueType | null): void {
    this.value = value;
  }

  public registerOnChange(onChange: (value?: ValueType | null) => void): void {
    this.onChange = onChange;
  }

  /**
   * Registers a callback function that is called when the control's value
   * changes in the UI.
   *
   * This method is called by the forms API on initialization to update the form
   * model when values propagate from the view to the model.
   *
   * When implementing the `registerOnChange` method in your own value accessor,
   * save the given function so your class calls it at the appropriate time.
   *
   * @usageNotes
   * ### Store the change function
   *
   * The following example stores the provided function as an internal method.
   *
   * ```ts
   * registerOnChange(fn: (_: any) => void): void {
   *   this._onChange = fn;
   * }
   * ```
   *
   * When the value changes in the UI, call the registered
   * function to allow the forms API to update itself:
   *
   * ```ts
   * host: {
   *    '(change)': '_onChange($event.target.value)'
   * }
   * ```
   */
  public onChange(value: ValueType | null | undefined): void {
    if (this._onChange) {
      this._onChange(value);
    }

    this.setStateQueue$.next();
  }

  /**
   * Registers a callback function is called by the forms API on initialization
   * to update the form model on blur.
   *
   * When implementing `registerOnTouched` in your own value accessor, save the given
   * function so your class calls it when the control should be considered
   * blurred or "touched".
   *
   * @usageNotes
   * ### Store the callback function
   *
   * The following example stores the provided function as an internal method.
   *
   * ```ts
   * registerOnTouched(fn: any): void {
   *   this._onTouched = fn;
   * }
   * ```
   *
   * On blur (or equivalent), your class should call the registered function to allow
   * the forms API to update itself:
   *
   * ```ts
   * host: {
   *    '(blur)': '_onTouched()'
   * }
   * ```
   */
  public registerOnTouched(onTouched: () => void): void {
    this._onTouched = onTouched;
  }

  /**
   * The on touched method
   */
  public onTouched(): void {
    if (this._onTouched) {
      this._onTouched();
    }

    this.setStateQueue$.next();
  }

  /**
   * Allows an external form to set the disabled state
   */
  public setDisabledState(disabled: boolean): void {
    this._disabled = disabled;

    this.setStateQueue$.next();
  }

  /**
   * Sets the value
   */
  public setValue(value?: ValueType | null): void {
    this.value = value;

    this.onTouched();
    this.onChange(value);
  }

  /**
   * Sets the state of this control
   */
  protected setState(): void {
    if (this.control) {
      this.valid = !!this.control.valid;
      this.invalid = !!this.control.invalid;
      this.pending = !!this.control.pending;
      this.pristine = !!this.control.pristine;
      this.untouched = !!this.control.untouched;
      this.touched = !!this.control.touched;
      this.dirty = !!this.control.dirty;
      this.errors = this.control.errors || {};
    }

    // this.showValidationErrors = this.getShowValidationErrors();
    this.inputClasses = this.getInputClasses();
    this.hostClass = this.getHostClass();
  }

  /**
   * Gets the host class and allows extending classes to extend by returning super.hostClass + 'custom-class'
   */
  protected override getHostClass(): string {
    const classes: string[] = [super.getHostClass(), 'Field'];

    // if (this.inFieldset) {
    //   classes.push('Fieldset__field');
    // } else {
    classes.push('Form__field');
    // }

    if (this.disabled) {
      classes.push('Field--disabled');
    }

    if (this.readonly) {
      classes.push('Field--readonly');
    }

    return classes.join(' ');
  }

  /**
   * Gets css classes for the control
   */
  protected getInputClasses(): Dictionary<boolean> {
    const classes: Dictionary<boolean> = {
      'ng-invalid': this.invalid,
      'ng-valid': this.valid,
      'ng-pending': this.pending,
      'ng-pristine': this.pristine,
      'ng-dirty': this.dirty,
      'ng-untouched': this.untouched,
      'ng-touched': this.touched,
      'Input--focused': this.focused,
      'Input--disabled': this.disabled,
      'Input--readonly': this.readonly,
    };

    if (this.inputClass) {
      classes[this.inputClass] = true;
    }

    return classes;
  }

  /**
   * If the control is part of a form or has an ngModel then we can check if the field has been marked as required programmatically,
   * otherwise we can only tell if this control is required by the [required] @Input
   */
  private checkIfControlIsRequired(): void {
    if (this.control && this.control.control && this.control.control.validator) {
      const validators = this.control.control.validator({} as AbstractControl);

      if (validators && validators['required']) {
        this._required = true;
      }
    }
  }
}
