import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControlComponent } from './control-component.abstract';

@Component({ template: '' })
export abstract class AbstractTextInputComponent extends AbstractControlComponent<string> {
  /**
   * The maximum length of the input's value
   */
  @Input() public maxlength?: number;

  /**
   * Placeholder text for the input
   */
  @Input() public placeholder = '';

  /**
   * Event emitter for a keydown
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public keydown = new EventEmitter<KeyboardEvent>();

  /**
   * Handle keydown events
   */
  public onKeyDown(event: KeyboardEvent): void {
    event.stopPropagation();

    this.keydown.emit(event);
  }
}
